import { Block } from 'slate'

import SchemaViolations from 'obojobo-document-engine/src/scripts/oboeditor/util/schema-violations'
import { CODE_NODE, CODE_LINE_NODE } from './constants'

const { CHILD_TYPE_INVALID, CHILD_MIN_INVALID } = SchemaViolations

const schema = {
	blocks: {
		[CODE_NODE]: {
			nodes: [
				{
					match: [{ type: CODE_LINE_NODE }],
					min: 1
				}
			],
			normalize: (editor, error) => {
				const { node, child, index } = error
				switch (error.code) {
					case CHILD_TYPE_INVALID: {
						// Allow inserting of new nodes by unwrapping unexpected blocks at end and beginning
						const isAtEdge = index === node.nodes.size - 1 || index === 0
						if (child.object === 'block' && isAtEdge) {
							return editor.unwrapNodeByKey(child.key)
						}

						return editor.wrapBlockByKey(child.key, {
							type: CODE_LINE_NODE,
							data: { content: { indent: 0 } }
						})
					}
					case CHILD_MIN_INVALID: {
						const block = Block.create({
							type: CODE_LINE_NODE,
							data: { content: { indent: 0 } }
						})
						return editor.insertNodeByKey(node.key, index, block)
					}
				}
			}
		},
		[CODE_LINE_NODE]: {
			nodes: [
				{
					match: [{ object: 'text' }],
					min: 1
				}
			]
		}
	}
}

export default schema
