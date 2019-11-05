import React from 'react'

import Node from './editor-component'
import ChoiceList from './components/choice-list/editor-component'
import Settings from './components/settings/editor-component'
import Schema from './schema'
import Converter from './converter'
import { MCASSESSMENT_NODE, SETTINGS_NODE, CHOICE_LIST_NODE } from './constants'

const MCAssessment = {
	name: MCASSESSMENT_NODE,
	menuLabel: 'Multiple Choice Assessment',
	isInsertable: false,
	supportsChildren: true,
	helpers: Converter,
	plugins: {
		renderNode(props, editor, next) {
			switch (props.node.type) {
				case MCASSESSMENT_NODE:
					return <Node {...props} {...props.attributes} />
				case SETTINGS_NODE:
					return <Settings {...props} {...props.attributes} />
				case CHOICE_LIST_NODE:
					return <ChoiceList {...props} {...props.attributes} />
				default:
					return next()
			}
		},
		schema: Schema
	}
}

export default MCAssessment
