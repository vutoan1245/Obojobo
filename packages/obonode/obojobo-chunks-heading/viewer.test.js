jest.mock('obojobo-document-engine/src/scripts/common/index', () => ({
	Registry: {
		registerModel: jest.fn()
	}
}))

jest.mock('./viewer-component', () => ({}))
jest.mock('./adapter', () => ({}))

import Common from 'obojobo-document-engine/src/scripts/common/index'
import { HEADING_NODE } from './constants'

// include the script we're testing, it registers the model
import './viewer'
import ViewerComponent from './viewer-component'

describe(`${HEADING_NODE} registration`, () => {
	test('registerModel registers expected vars', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		expect(register[0]).toBe(HEADING_NODE)
		expect(register[1]).toHaveProperty('type', 'chunk')
		expect(register[1]).toHaveProperty('adapter', {})
		expect(register[1]).toHaveProperty('componentClass', ViewerComponent)
		expect(register[1]).toHaveProperty('getNavItem', expect.any(Function))
	})

	test('getNavItem returns link for level 1 headings', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			modelState: {
				headingLevel: 1,
				textGroup: {
					first: {
						text: 'mockHeading'
					}
				}
			},
			getIndex: jest.fn().mockReturnValueOnce(1),
			toText: jest.fn().mockReturnValueOnce('mockText')
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toMatchSnapshot()
	})

	test('getNavItem returns nothing for level 1 headings with a zero index', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			modelState: {
				headingLevel: 1
			},
			getIndex: jest.fn().mockReturnValueOnce(0)
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toMatchSnapshot()
	})

	test('getNavItem returns link for level 2 headings', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			modelState: {
				headingLevel: 2,
				textGroup: {
					first: {
						text: 'mockHeading'
					}
				}
			},
			toText: jest.fn().mockReturnValueOnce('mockText')
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toMatchSnapshot()
	})

	test('getNavItem returns nothing for level 3 headings', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			modelState: {
				headingLevel: 3
			}
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toMatchSnapshot()
	})
})
