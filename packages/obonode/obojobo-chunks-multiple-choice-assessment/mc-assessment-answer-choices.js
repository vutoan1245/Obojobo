import Common from 'Common'
import MCAssessmentResults from './mc-assessment-results'
import React from 'react'
import { TYPE_PICK_ALL } from './constants'

const { focus } = Common.page

export default class MCAssessmentAnswerChoices extends React.Component {
	constructor(props) {
		super(props)
		this.resultsRef = React.createRef()
	}

	focusOnResults() {
		focus(this.resultsRef.current)
	}

	render() {
		const responseType = this.props.responseType
		const isTypePickAll = responseType === TYPE_PICK_ALL
		const isAnswerScored = this.props.score !== null // Question has been submitted in practice or scored by server in assessment

		return (
			<div role={isTypePickAll ? null : 'radiogroup'}>
				<div className="for-screen-reader-only" ref={this.resultsRef} tabIndex="-1">
					{isAnswerScored ? (
						<MCAssessmentResults
							score={this.props.score}
							type={this.props.type}
							isTypePickAll={isTypePickAll}
							correctLabel={this.props.correctLabel}
							incorrectLabel={this.props.incorrectLabel}
							pickAllIncorrectMessage={this.props.pickAllIncorrectMessage}
							isForScreenReader
						/>
					) : null}
				</div>
				{this.props.models.map((model, index) => {
					const Component = model.getComponentClass()
					return (
						<Component
							key={model.get('id')}
							model={model}
							moduleData={this.props.moduleData}
							responseType={responseType}
							isShowingExplanation
							mode={this.props.mode}
							type={this.props.type}
							questionSubmitted={isAnswerScored}
							choiceIndex={index}
						/>
					)
				})}
			</div>
		)
	}
}
