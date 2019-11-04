import ActionButton from './editor-registration'
import { ACTION_BUTTON_NODE } from './constants'

describe('ActionButton editor', () => {
	test('plugins.renderNode renders a button when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: ACTION_BUTTON_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(ActionButton.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode calls next', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: 'mockNode',
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		const next = jest.fn()

		expect(ActionButton.plugins.renderNode(props, null, next)).toMatchSnapshot()
		expect(next).toHaveBeenCalled()
	})

	test('plugins.renderPlaceholder exits when not relevent', () => {
		expect(
			ActionButton.plugins.renderPlaceholder(
				{
					node: {
						object: 'text'
					}
				},
				null,
				jest.fn()
			)
		).toMatchSnapshot()

		expect(
			ActionButton.plugins.renderPlaceholder(
				{
					node: {
						object: 'block',
						type: 'mockType'
					}
				},
				null,
				jest.fn()
			)
		).toMatchSnapshot()

		expect(
			ActionButton.plugins.renderPlaceholder(
				{
					node: {
						object: 'block',
						type: ACTION_BUTTON_NODE,
						text: 'Some text'
					}
				},
				null,
				jest.fn()
			)
		).toMatchSnapshot()
	})

	test('plugins.renderPlaceholder renders a placeholder', () => {
		expect(
			ActionButton.plugins.renderPlaceholder(
				{
					node: {
						object: 'block',
						type: ACTION_BUTTON_NODE,
						text: ''
					}
				},
				null,
				jest.fn()
			)
		).toMatchSnapshot()
	})
})
