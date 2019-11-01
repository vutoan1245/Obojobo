import Break from './editor-registration'

import { BREAK_NODE } from './constants'

describe('Break editor', () => {
	test('plugins.renderNode renders a break when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: BREAK_NODE,
				data: {
					get: () => ({})
				}
			}
		}

		expect(Break.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode calls next', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: 'mockNode',
				data: {
					get: () => ({})
				}
			}
		}

		const next = jest.fn()

		expect(Break.plugins.renderNode(props, null, next)).toMatchSnapshot()
		expect(next).toHaveBeenCalled()
	})
})
