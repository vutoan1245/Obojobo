import { CHILD_TYPE_INVALID } from 'slate-schema-violations'

import MCAssessment from './editor-registration'
import { MCASSESSMENT_NODE, SETTINGS_NODE, CHOICE_LIST_NODE } from './constants'

describe('MCAssessment editor', () => {
	test('plugins.renderNode renders a MCAssessment when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: MCASSESSMENT_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(MCAssessment.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode renders a Setting when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: SETTINGS_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(MCAssessment.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode renders a ChoiceList when passed', () => {
		const props = {
			node: {
				attributes: { dummy: 'dummyData' },
				type: CHOICE_LIST_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(MCAssessment.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode calls next', () => {
		const props = {
			node: {
				attributes: { dummy: 'dummyData' },
				type: 'mockNode',
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		const next = jest.fn()

		expect(MCAssessment.plugins.renderNode(props, null, next)).toMatchSnapshot()
		expect(next).toHaveBeenCalled()
	})

	test('plugins.schema.normalize fixes invalid first child in MCAssessment', () => {
		const editor = {
			wrapBlockByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[MCASSESSMENT_NODE].normalize(editor, {
			code: CHILD_TYPE_INVALID,
			node: {},
			child: { key: 'mockKey' },
			index: 0
		})

		expect(editor.wrapBlockByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize fixes invalid second child in MCAssessment', () => {
		const editor = {
			wrapBlockByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[MCASSESSMENT_NODE].normalize(editor, {
			code: CHILD_TYPE_INVALID,
			node: {},
			child: { key: 'mockKey' },
			index: 1
		})

		expect(editor.wrapBlockByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize adds required first child in MCAssessment', () => {
		const editor = {
			insertNodeByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[MCASSESSMENT_NODE].normalize(editor, {
			code: 'child_min_invalid',
			node: {},
			child: null,
			index: 0
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize adds required first child in MCAssessment', () => {
		const editor = {
			insertNodeByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[MCASSESSMENT_NODE].normalize(editor, {
			code: 'child_min_invalid',
			node: {},
			child: null,
			index: 1
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize fixes invalid children in ChoiceList', () => {
		const editor = {
			wrapBlockByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[CHOICE_LIST_NODE].normalize(editor, {
			code: CHILD_TYPE_INVALID,
			node: {},
			child: { key: 'mockKey' },
			index: null
		})

		expect(editor.wrapBlockByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize adds required children in ChoiceList', () => {
		const editor = {
			insertNodeByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[CHOICE_LIST_NODE].normalize(editor, {
			code: 'child_min_invalid',
			node: {},
			child: null,
			index: 0
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize adds missing first child in setting', () => {
		const editor = {
			insertNodeByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[SETTINGS_NODE].normalize(editor, {
			code: 'child_min_invalid',
			node: {},
			child: null,
			index: 0
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize adds missing second child in setting', () => {
		const editor = {
			insertNodeByKey: jest.fn()
		}

		MCAssessment.plugins.schema.blocks[SETTINGS_NODE].normalize(editor, {
			code: 'child_min_invalid',
			node: {},
			child: null,
			index: 1
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize fixes first invalid child in setting', () => {
		const editor = {
			insertNodeByKey: jest.fn(),
			removeNodeByKey: jest.fn()
		}

		editor.withoutNormalizing = funct => funct(editor)

		MCAssessment.plugins.schema.blocks[SETTINGS_NODE].normalize(editor, {
			code: CHILD_TYPE_INVALID,
			node: {},
			child: { key: 'mockKey' },
			index: 0
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.schema.normalize fixes second invalid child in setting', () => {
		const editor = {
			insertNodeByKey: jest.fn(),
			removeNodeByKey: jest.fn()
		}

		editor.withoutNormalizing = funct => funct(editor)

		MCAssessment.plugins.schema.blocks[SETTINGS_NODE].normalize(editor, {
			code: CHILD_TYPE_INVALID,
			node: {},
			child: { key: 'mockKey' },
			index: 1
		})

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})
})
