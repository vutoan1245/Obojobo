import './viewer-component.scss'
import './editor-component.scss'

import React from 'react'
import Common from 'obojobo-document-engine/src/scripts/common'
import { Block } from 'slate'
import isOrNot from 'obojobo-document-engine/src/scripts/common/util/isornot'

const { Button } = Common.components

const MCFEEDBACK_NODE = 'ObojoboDraft.Chunks.MCAssessment.MCFeedback'

class MCChoice extends React.Component {
	constructor(props) {
		super(props)
	}

	delete(event) {
		event.stopPropagation()
		const editor = this.props.editor
		return editor.removeNodeByKey(this.props.node.key)
	}

	handleScoreChange(event) {
		event.stopPropagation()
		const editor = this.props.editor
		const newScore = this.props.node.data.get('content').score === 100 ? 0 : 100

		return editor.setNodeByKey(this.props.node.key, {
			data: {
				content: {
					score: newScore
				}
			}
		})
	}

	addFeedback() {
		const editor = this.props.editor

		const newFeedback = Block.create({
			type: MCFEEDBACK_NODE
		})
		return editor.insertNodeByKey(this.props.node.key, this.props.node.nodes.size, newFeedback)
	}

	render() {
		const isSelected = this.props.isSelected
		const score = this.props.node.data.get('content').score
		const hasFeedback = this.props.node.nodes.size === 2

		const className =
			'component obojobo-draft--chunks--mc-assessment--mc-choice' +
			isOrNot(score === 100, 'correct') +
			isOrNot(isSelected, 'selected') +
			' editor-mc-choice'

		return (
			<div className={className}>
				<Button className="delete-button" onClick={event => this.delete(event)}>
					×
				</Button>
				<button className="correct-button" onClick={event => this.handleScoreChange(event)}>
					{score === 100 ? '✔' : '✖'}
				</button>
				<div className="children">
					<React.Fragment>{this.props.children}</React.Fragment>
				</div>
				{!hasFeedback ? (
					<button className="add-feedback" onClick={() => this.addFeedback()}>
						Add Feedback
					</button>
				) : null}
			</div>
		)
	}
}

export default MCChoice
