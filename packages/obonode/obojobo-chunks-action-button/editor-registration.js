import React from 'react'

import emptyNode from './empty-node.json'
import Icon from './icon'
import Node from './editor-component'
import Schema from './schema'
import Converter from './converter'
import { ACTION_BUTTON_NODE } from './constants'

const ActionButton = {
	name: ACTION_BUTTON_NODE,
	menuLabel: 'Button',
	icon: Icon,
	isInsertable: true,
	components: {
		Node,
		Icon
	},
	helpers: Converter,
	json: {
		emptyNode
	},
	plugins: {
		renderNode(props, editor, next) {
			switch (props.node.type) {
				case ACTION_BUTTON_NODE:
					return <Node {...props} {...props.attributes} />
				default:
					return next()
			}
		},
		renderPlaceholder(props, editor, next) {
			const { node } = props
			if (node.object !== 'block' || node.type !== ACTION_BUTTON_NODE) return next()
			if (node.text !== '') return next()

			return (
				<span
					className={'placeholder align-center required'}
					contentEditable={false}
					data-placeholder="Your Label Here"
				/>
			)
		},
		schema: Schema
	}
}

export default ActionButton
