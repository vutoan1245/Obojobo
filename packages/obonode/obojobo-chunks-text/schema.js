import { Block } from 'slate'

import SchemaViolations from 'obojobo-document-engine/src/scripts/oboeditor/util/schema-violations'
import { TEXT_NODE, TEXT_LINE_NODE } from './constant'

const { CHILD_TYPE_INVALID, CHILD_MIN_INVALID } = SchemaViolations

const schema = {
	blocks: {
		[TEXT_NODE]: {
			nodes: [
				{
					match: [{ type: TEXT_LINE_NODE }],
					min: 1
				}
			],
			normalize: (editor, error) => {
				const { node, child, index } = error
				switch (error.code) {
					case CHILD_TYPE_INVALID: {
						// Allow inserting of new nodes by unwrapping unexpected blocks
						if (child.object === 'block') {
							return editor.unwrapNodeByKey(child.key)
						}

						return editor.wrapBlockByKey(child.key, {
							type: TEXT_LINE_NODE,
							data: { indent: 0 }
						})
					}
					case CHILD_MIN_INVALID: {
						const block = Block.create({
							type: TEXT_LINE_NODE,
							data: { indent: 0 }
						})
						return editor.insertNodeByKey(node.key, index, block)
					}
				}
			}
		},
		[TEXT_LINE_NODE]: {
			nodes: [{ match: [{ object: 'text' }] }],
			normalize: (editor, error) => {
				const { child } = error
				switch (error.code) {
					case CHILD_TYPE_INVALID: {
						if (child.object === 'block') {
							return editor.unwrapNodeByKey(child.key)
						}
					}
				}
			}
		}
	}
}

export default schema
