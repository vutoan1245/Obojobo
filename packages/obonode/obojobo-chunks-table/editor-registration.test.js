import KeyDownUtil from 'obojobo-document-engine/src/scripts/oboeditor/util/keydown-util'
jest.mock('obojobo-document-engine/src/scripts/oboeditor/util/keydown-util')
import SlateReact from 'slate-react'
jest.mock('slate-react')

import Table from './editor-registration'
import { TABLE_NODE, TABLE_ROW_NODE, TABLE_CELL_NODE } from './constants'

describe('Table editor', () => {
	test('plugins.onPaste deals with no table', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: () => false
				}
			}
		}
		editor.insertBlock = jest.fn().mockReturnValueOnce(editor)

		const event = {
			preventDefault: jest.fn()
		}

		Table.plugins.onPaste(event, editor, jest.fn())

		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	test('plugins.onPaste deals with pasting into table', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: () => true
				}
			}
		}
		editor.insertText = jest.fn().mockReturnValueOnce(editor)

		SlateReact.getEventTransfer.mockReturnValueOnce({ text: 'mock text' })

		const event = {
			preventDefault: jest.fn()
		}

		Table.plugins.onPaste(event, editor, jest.fn())

		expect(editor.insertText).toHaveBeenCalled()
	})

	test('plugins.onCut deals with no table', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: () => false
				}
			}
		}
		editor.insertBlock = jest.fn().mockReturnValueOnce(editor)

		const event = {
			preventDefault: jest.fn()
		}

		Table.plugins.onCut(event, editor, jest.fn())

		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	test('plugins.onCut deals with cutting from table', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: () => true
				},
				fragment: 'mockFragment'
			}
		}
		editor.insertText = jest.fn().mockReturnValueOnce(editor)

		const event = {
			preventDefault: jest.fn()
		}

		Table.plugins.onCut(event, editor, jest.fn())

		expect(SlateReact.cloneFragment).toHaveBeenCalled()
	})

	test('plugins.onKeyDown deals with no table', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: () => false
				}
			}
		}
		editor.insertBlock = jest.fn().mockReturnValueOnce(editor)

		const event = {
			key: 'Enter',
			preventDefault: jest.fn()
		}

		Table.plugins.onKeyDown(event, editor, jest.fn())

		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	test('plugins.onKeyDown deals with random key press', () => {
		const editor = {
			value: {
				blocks: [
					{
						key: 'mockBlockKey'
					}
				],
				document: {
					getClosest: (key, funct) => {
						funct({ type: TABLE_NODE })
						return true
					}
				}
			}
		}
		editor.insertBlock = jest.fn().mockReturnValueOnce(editor)

		const event = {
			key: 'K',
			preventDefault: jest.fn()
		}

		Table.plugins.onKeyDown(event, editor, jest.fn())

		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	test('plugins.onKeyDown deals with [Enter]', () => {
		const editor = {
			value: {
				document: {
					getClosest: () => true
				},
				blocks: [{ key: 'mockKey' }]
			}
		}
		const event = {
			key: 'Enter',
			preventDefault: jest.fn()
		}

		Table.plugins.onKeyDown(event, editor, jest.fn())
		expect(event.preventDefault).toHaveBeenCalled()
	})

	test('plugins.onKeyDown deals with [Backspace]', () => {
		const editor = {
			value: {
				document: {
					getClosest: () => true
				},
				blocks: [{ key: 'mockKey' }]
			}
		}
		const event = {
			key: 'Backspace',
			preventDefault: jest.fn()
		}

		Table.plugins.onKeyDown(event, editor, jest.fn())
		expect(KeyDownUtil.deleteNodeContents).toHaveBeenCalled()
	})

	test('plugins.onKeyDown deals with [Delete]', () => {
		const editor = {
			value: {
				document: {
					getClosest: () => true
				},
				blocks: [{ key: 'mockKey' }]
			}
		}
		const event = {
			key: 'Delete',
			preventDefault: jest.fn()
		}

		Table.plugins.onKeyDown(event, editor, jest.fn())
		expect(KeyDownUtil.deleteNodeContents).toHaveBeenCalled()
	})

	test('plugins.renderNode renders a Table when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: TABLE_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(Table.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode renders a row when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: TABLE_ROW_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(Table.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
	})

	test('plugins.renderNode renders a cell when passed', () => {
		const props = {
			attributes: { dummy: 'dummyData' },
			node: {
				type: TABLE_CELL_NODE,
				data: {
					get: () => {
						return {}
					}
				}
			}
		}

		expect(Table.plugins.renderNode(props, null, jest.fn())).toMatchSnapshot()
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

		expect(Table.plugins.renderNode(props, null, next)).toMatchSnapshot()
	})

	test('plugins.normalizeNode does nothing if all nodes match schema', () => {
		const nextFunct = jest.fn()
		const editor = {
			insertNodeByKey: jest.fn()
		}

		Table.plugins.normalizeNode({ object: 'text' }, editor, nextFunct)
		expect(nextFunct).toHaveBeenCalledTimes(1)

		Table.plugins.normalizeNode({ object: 'block', type: 'mockNode' }, editor, nextFunct)
		expect(nextFunct).toHaveBeenCalledTimes(2)

		const tableRow = {
			object: 'block',
			type: TABLE_ROW_NODE,
			data: { get: () => ({ numCols: 1 }) },
			nodes: { size: 1 }
		}
		Table.plugins.normalizeNode(tableRow, editor, nextFunct)
		expect(nextFunct).toHaveBeenCalledTimes(3)

		expect(editor.insertNodeByKey).not.toHaveBeenCalled()
	})

	test('plugins.normalizeNode fixes rows with too few columns', () => {
		const nextFunct = jest.fn()
		const editor = {
			insertNodeByKey: jest.fn()
		}

		const tableRow = {
			object: 'block',
			type: TABLE_ROW_NODE,
			data: { get: () => ({ numCols: 1 }) },
			nodes: { size: 0 }
		}
		const normalizer = Table.plugins.normalizeNode(tableRow, editor, nextFunct)
		expect(nextFunct).not.toHaveBeenCalled()

		normalizer(editor)

		expect(editor.insertNodeByKey).toHaveBeenCalled()
	})

	test('plugins.normalizeNode fixes rows with too many columns', () => {
		const nextFunct = jest.fn()
		const editor = {
			setNodeByKey: jest.fn()
		}

		const tableRow = {
			object: 'block',
			type: TABLE_ROW_NODE,
			data: { get: () => ({ numCols: 1 }) },
			nodes: { size: 2 }
		}
		const normalizer = Table.plugins.normalizeNode(tableRow, editor, nextFunct)
		expect(nextFunct).not.toHaveBeenCalled()

		normalizer(editor)

		expect(editor.setNodeByKey).toHaveBeenCalled()
	})
})
