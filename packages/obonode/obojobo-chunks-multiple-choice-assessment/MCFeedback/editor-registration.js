import React from 'react'

import Node from './editor-component'
import Schema from './schema'
import Converter from './converter'
import { MCFEEDBACK_NODE } from '../constants'

const MCFeedback = {
	name: MCFEEDBACK_NODE,
	menuLabel: 'Multiple Choice Feedback',
	isInsertable: false,
	supportsChildren: true,
	helpers: Converter,
	plugins: {
		renderNode(props, editor, next) {
			switch (props.node.type) {
				case MCFEEDBACK_NODE:
					return <Node {...props} {...props.attributes} />
				default:
					return next()
			}
		},
		schema: Schema
	}
}

export default MCFeedback
