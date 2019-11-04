import React from 'react'
import { Block } from 'slate'
import Common from 'obojobo-document-engine/src/scripts/common'

import emptyNode from './empty-node.json'
import Icon from './icon'
import Node from './editor-component'
import Settings from './components/settings/editor-component'
import Schema from './schema'
import Converter from './converter'
import {
	QUESTION_NODE,
	QUESTION_BANK_NODE,
	SETTINGS_NODE,
	TEXT_NODE,
	TEXT_LINE_NODE
} from './constants'

const QuestionBank = {
	name: QUESTION_BANK_NODE,
	menuLabel: 'Question Bank',
	icon: Icon,
	isInsertable: true,
	supportsChildren: true,
	helpers: Converter,
	json: {
		emptyNode
	},
	plugins: {
		renderNode(props, editor, next) {
			switch (props.node.type) {
				case QUESTION_BANK_NODE:
					return <Node {...props} {...props.attributes} />
				case SETTINGS_NODE:
					return <Settings {...props} {...props.attributes} />
				default:
					return next()
			}
		},
		schema: Schema
	},
	getPasteNode: questionbank => {
		// If passed a 'whole' questionbank, return the questionbank
		// A 'whole' question bank contains either more than 1 question, or a question(s) and the qb settings
		if (questionbank.nodes.size > 1) return questionbank

		// If the questionbank is not whole and the child is a question, get just the question
		// (or just the content nodes, if a whole question is not selected)
		const childNode = questionbank.nodes.get(0)
		if (childNode.type === QUESTION_NODE) {
			return Common.Registry.getItemForType(QUESTION_NODE).getPasteNode(childNode)
			// If the child is not a question, it is a settings node.
			// Extract just the plain text, and paste that
		} else {
			return childNode.nodes.map(parameter =>
				Block.create({
					object: 'block',
					type: TEXT_NODE,
					nodes: parameter.nodes.map(node => ({
						object: 'block',
						type: TEXT_LINE_NODE,
						nodes: [node.toJSON()]
					}))
				})
			)
		}
	}
}

export default QuestionBank
