jest.mock('obojobo-document-engine/src/scripts/common/index', () => ({
	Registry: {
		registerModel: jest.fn()
	}
}))

jest.mock('./viewer-component', () => ({}))

const Common = require('obojobo-document-engine/src/scripts/common/index')

// include the script we're testing, it registers the model
import './viewer'
import ViewerComponent from './viewer-component'
import { PAGE_NODE } from './constants'

describe(`${PAGE_NODE} registration`, () => {
	test('registerModel registers expected vars', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		expect(register[0]).toBe(PAGE_NODE)
		expect(register[1]).toHaveProperty('type', 'page')
		expect(register[1]).toHaveProperty('componentClass', ViewerComponent)
	})

	test('getNavItem returns link with no title', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			title: null,
			get: () => PAGE_NODE,
			parent: {
				children: {
					models: [
						{
							get: () => 'not a page'
						},
						{
							get: () => PAGE_NODE
						}
					]
				}
			}
		}
		model.parent.children.models.push(model)

		const nav = register[1].getNavItem(model)
		expect(nav).toEqual({
			type: 'link',
			label: 'Page 2',
			contentType: 'Page',
			path: ['page-2'],
			showChildren: false
		})
	})

	test('getNavItem returns link with title', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			title: 'mock Title'
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toEqual({
			type: 'link',
			label: 'mock Title',
			contentType: 'Page',
			path: ['mock-title'],
			showChildren: false
		})
	})

	test('getNavItem returns link with numeric title', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		const model = {
			title: 1
		}

		const nav = register[1].getNavItem(model)
		expect(nav).toEqual({
			type: 'link',
			label: '1',
			contentType: 'Page',
			path: ['1'],
			showChildren: false
		})
	})
})
