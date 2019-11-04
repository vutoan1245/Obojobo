import { getEventTransfer } from 'slate-react'
import { Block } from 'slate'

import Converter from './converter'
import Icon from './icon'
import KeyDownUtil from 'obojobo-document-engine/src/scripts/oboeditor/util/keydown-util'
import Line from './components/line/editor-component'
import Node from './editor-component'
import React from 'react'
import Schema from './schema'
import decreaseIndent from './changes/decrease-indent'
import emptyNode from './empty-node.json'
import increaseIndent from './changes/increase-indent'
import { CODE_NODE, CODE_LINE_NODE } from './constants'

const isType = editor => {
	return editor.value.blocks.some(block => {
		return !!editor.value.document.getClosest(block.key, parent => {
			return parent.type === CODE_NODE
		})
	})
}

const plugins = {
	onPaste(event, editor, next) {
		const isCode = isType(editor)
		const transfer = getEventTransfer(event)
		if (transfer.type === 'fragment' || !isCode) return next()

		const saveBlocks = editor.value.blocks

		editor
			.createCodeLinesFromText(transfer.text.split('\n'))
			.forEach(line => editor.insertBlock(line))

		saveBlocks.forEach(node => {
			if (node.text === '') {
				editor.removeNodeByKey(node.key)
			}
		})
	},
	onKeyDown(event, editor, next) {
		const isCode = isType(editor)
		if (!isCode) return next()

		switch (event.key) {
			case 'Backspace':
			case 'Delete':
				return KeyDownUtil.deleteEmptyParent(event, editor, next, CODE_NODE)

			case 'Tab':
				// TAB+SHIFT
				if (event.shiftKey) return decreaseIndent(event, editor, next)

				// TAB
				return increaseIndent(event, editor, next)

			default:
				return next()
		}
	},
	renderPlaceholder(props, editor, next) {
		const { node } = props
		if (node.object !== 'block' || node.type !== CODE_LINE_NODE) return next()
		if (node.text !== '') return next()

		return (
			<span
				className={'placeholder'}
				contentEditable={false}
				data-placeholder="Type Your Code Here"
			/>
		)
	},
	renderNode(props, editor, next) {
		switch (props.node.type) {
			case CODE_NODE:
				return <Node {...props} {...props.attributes} />
			case CODE_LINE_NODE:
				return <Line {...props} {...props.attributes} />
			default:
				return next()
		}
	},
	schema: Schema,
	queries: {
		createCodeLinesFromText(editor, textList) {
			return textList.map(textLine =>
				Block.create({
					object: 'block',
					type: CODE_LINE_NODE,
					data: { content: { indent: 0 } },
					nodes: [
						{
							object: 'text',
							leaves: [{ object: 'leaf', text: textLine, marks: [] }]
						}
					]
				})
			)
		}
	}
}

const Code = {
	name: CODE_NODE,
	icon: Icon,
	menuLabel: 'Code',
	isInsertable: true,
	helpers: Converter,
	json: {
		emptyNode
	},
	plugins
}

export default Code
