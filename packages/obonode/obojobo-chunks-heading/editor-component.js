import './viewer-component.scss'
import './editor-component.scss'

import React from 'react'
import Node from 'obojobo-document-engine/src/scripts/oboeditor/components/node/editor-component'
import withSlateWrapper from 'obojobo-document-engine/src/scripts/oboeditor/components/node/with-slate-wrapper'
import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

const Heading = props => {
	const { content } = props.element
	const HTag = `h${content.headingLevel || 1}`

	const onClick = event => {
		if (event.detail === 3) {
			const path = ReactEditor.findPath(props.editor, props.element)
			Transforms.select(props.editor, path)
		}
	}

	return (
		<Node {...props}>
			<div className={'text-chunk obojobo-draft--chunks--heading pad'} onClick={onClick}>
				<HTag>
					<span className={`obo-text align-${content.align}`}>{props.children}</span>
				</HTag>
			</div>
		</Node>
	)
}

export default withSlateWrapper(Heading)
