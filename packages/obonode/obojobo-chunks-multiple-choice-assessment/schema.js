import { Block } from 'slate'

import ToggleParameter from 'obojobo-document-engine/src/scripts/oboeditor/components/parameter-node/toggle-parameter'
import SelectParameter from 'obojobo-document-engine/src/scripts/oboeditor/components/parameter-node/select-parameter'
import SchemaViolations from 'obojobo-document-engine/src/scripts/oboeditor/util/schema-violations'
import {
	MCASSESSMENT_NODE,
	MCCHOICE_NODE,
	SETTINGS_NODE,
	CHOICE_LIST_NODE,
	TYPE_PICK_ONE,
	TYPE_PICK_ALL
} from './constants'

const { CHILD_TYPE_INVALID, CHILD_MIN_INVALID } = SchemaViolations

const TOGGLE_PARAMETER = 'oboeditor.toggle-parameter'
const SELECT_PARAMETER = 'oboeditor.select-parameter'

const schema = {
	blocks: {
		[MCASSESSMENT_NODE]: {
			nodes: [
				{
					match: [{ type: MCCHOICE_NODE }],
					min: 1
				}
			],
			normalize: (editor, error) => {
				const { node, child, index } = error
				switch (error.code) {
					case CHILD_MIN_INVALID: {
						const block = Block.create({
							type: MCCHOICE_NODE,
							data: { content: { score: 0 } }
						})
						return editor.insertNodeByKey(node.key, index, block)
					}
					case CHILD_TYPE_INVALID: {
						const block = Block.create({
							type: MCCHOICE_NODE,
							data: { content: { score: 0 } }
						})
						return editor.wrapBlockByKey(child.key, block)
					}
				}
			}
		},
		[CHOICE_LIST_NODE]: {
			nodes: [
				{
					match: [{ type: MCCHOICE_NODE }],
					min: 1
				}
			],
			normalize: (editor, error) => {
				const { node, child, index } = error
				switch (error.code) {
					case CHILD_MIN_INVALID: {
						const block = Block.create({
							type: MCCHOICE_NODE,
							data: { content: { score: 0 } }
						})
						return editor.insertNodeByKey(node.key, index, block)
					}
					case CHILD_TYPE_INVALID: {
						const block = Block.create({
							type: MCCHOICE_NODE,
							data: { content: { score: 0 } }
						})
						return editor.wrapBlockByKey(child.key, block)
					}
				}
			}
		},
		[SETTINGS_NODE]: {
			nodes: [
				{
					match: [{ type: SELECT_PARAMETER }],
					min: 1,
					max: 1
				},
				{
					match: [{ type: TOGGLE_PARAMETER }],
					min: 1,
					max: 1
				}
			],
			normalize: (editor, error) => {
				const { node, child, index } = error
				switch (error.code) {
					case CHILD_MIN_INVALID: {
						if (index === 0) {
							const block = Block.create(
								SelectParameter.helpers.oboToSlate('responseType', TYPE_PICK_ONE, 'Response Type', [
									TYPE_PICK_ONE,
									TYPE_PICK_ALL
								])
							)
							return editor.insertNodeByKey(node.key, index, block)
						}
						const block = Block.create(
							ToggleParameter.helpers.oboToSlate('shuffle', true, 'Shuffle')
						)
						return editor.insertNodeByKey(node.key, index, block)
					}
					case CHILD_TYPE_INVALID: {
						if (index === 0) {
							const block = Block.create(
								SelectParameter.helpers.oboToSlate('responseType', TYPE_PICK_ONE, 'Response Type', [
									TYPE_PICK_ONE,
									TYPE_PICK_ALL
								])
							)
							return editor.withoutNormalizing(e => {
								e.removeNodeByKey(child.key)
								return e.insertNodeByKey(node.key, index, block)
							})
						}
						const block = Block.create(
							ToggleParameter.helpers.oboToSlate('shuffle', true, 'Shuffle')
						)
						return editor.withoutNormalizing(e => {
							e.removeNodeByKey(child.key)
							return e.insertNodeByKey(node.key, index, block)
						})
					}
				}
			}
		}
	}
}

export default schema
