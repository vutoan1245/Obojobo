import './viewer-component.scss'
import './editor-component.scss'

import React from 'react'
import Common from 'obojobo-document-engine/src/scripts/common'
import { Block } from 'slate'
import isOrNot from 'obojobo-document-engine/src/scripts/common/util/isornot'
import { MCFEEDBACK_NODE } from '../constants'

const { Button } = Common.components

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
		const score = this.props.node.data.get('content').score
		const hasFeedback = this.props.node.nodes.size === 2

		const className =
			'component obojobo-draft--chunks--mc-assessment--mc-choice' +
			isOrNot(score === 100, 'correct') +
			' editor-mc-choice'

		return (
			<div className={className}>
				<Button className="delete-button" onClick={event => this.delete(event)}>
					×
				</Button>
				<Button
					className="correct-button"
					onClick={event => this.handleScoreChange(event)}
					contentEditable={false}
				>
					{score === 100 ? '✔ Correct' : '✖ Incorrect'}
				</Button>
				<div className="children">
					<div>{this.props.children}</div>
				</div>
				{!hasFeedback ? (
					<Button className="add-feedback" onClick={() => this.addFeedback()}>
						Add Feedback
					</Button>
				) : null}
			</div>
		)
	}
}

export default MCChoice
