import './viewer-component.scss'

import { CSSTransition } from 'react-transition-group'
import React from 'react'
import Viewer from 'obojobo-document-engine/src/scripts/viewer'
import isOrNot from 'obojobo-document-engine/src/scripts/common/util/isornot'
import {
	MCANSWER_NODE,
	MCFEEDBACK_NODE,
	TYPE_PICK_ONE,
	TYPE_MULTI_CORRECT,
	TYPE_PICK_ALL,
	MODE_REVIEW,
	MODE_SURVEY
} from '../constants'

const { OboComponent } = Viewer.components
const { QuestionUtil } = Viewer.util

const QUESTION_TYPE = 'ObojoboDraft.Chunks.Question'
const CHOSEN_CORRECTLY = 'chosen-correctly'
const CHOSEN_SURVEY = 'chosen-survey'
const SHOULD_NOT_HAVE_CHOSEN = 'should-not-have-chosen'
const COULD_HAVE_CHOSEN = 'could-have-chosen'
const SHOULD_HAVE_CHOSEN = 'should-have-chosen'
const UNCHOSEN_CORRECTLY = 'unchosen-correctly'

const TRANSITION_TIME_MS = 800

const getInputType = responseType => {
	switch (responseType) {
		case TYPE_PICK_ALL:
			return 'checkbox'
		case TYPE_PICK_ONE:
		case TYPE_MULTI_CORRECT:
		default:
			return 'radio'
	}
}

const choiceIsSelected = (questionState, model, navStateContext) => {
	const response = QuestionUtil.getResponse(
		questionState,
		model.getParentOfType(QUESTION_TYPE),
		navStateContext
	) || { ids: [] }

	return response.ids.indexOf(model.get('id')) !== -1
}

const getQuestionModel = model => model.getParentOfType(QUESTION_TYPE)

const getQuestionScore = (model, isReview, questionState, navStateContext) => {
	const questionModel = getQuestionModel(model)

	if (isReview) {
		return QuestionUtil.getScoreForModel(questionState, questionModel, navStateContext)
	}

	// Override any score property if this is for a survey type question
	if (questionModel.modelState.type === MODE_SURVEY) {
		return 'no-score'
	}

	return model.modelState.score
}

const renderAnswerFlag = type => {
	let flagEl

	switch (type) {
		case UNCHOSEN_CORRECTLY:
			return <div />

		case CHOSEN_CORRECTLY:
			flagEl = <p>Your Answer (Correct)</p>
			break

		case CHOSEN_SURVEY:
			flagEl = <p>Your Response</p>
			break

		case SHOULD_NOT_HAVE_CHOSEN:
			flagEl = <p>Your Answer (Incorrect)</p>
			break

		case COULD_HAVE_CHOSEN:
			flagEl = <p>Also Correct Answer</p>
			break

		case SHOULD_HAVE_CHOSEN:
			flagEl = <p>Correct Answer</p>
			break
	}

	return (
		<div className={`obojobo-draft--chunks--mc-assessment--mc-choice--answer-flag is-type-${type}`}>
			{flagEl}
		</div>
	)
}

const getAnsType = (model, isCorrect, isSelected) => {
	// The user selected a correct answer (not necessarily this one)
	// On multi-select questions, this is only true if a user selected all and only correct answers
	// Renamed for clarity w/ isACorrectChoice
	const userIsCorrect = isCorrect

	const isASurveyQuestion = getQuestionModel(model).modelState.type === MODE_SURVEY
	const isACorrectChoice = model.get('content').score === 100

	if (isASurveyQuestion) {
		return isSelected ? CHOSEN_SURVEY : UNCHOSEN_CORRECTLY
	}

	if (isSelected) {
		return isACorrectChoice ? CHOSEN_CORRECTLY : SHOULD_NOT_HAVE_CHOSEN
	}

	if (isACorrectChoice) {
		return userIsCorrect ? COULD_HAVE_CHOSEN : SHOULD_HAVE_CHOSEN
	}

	return UNCHOSEN_CORRECTLY
}

const getChoiceText = (score, isTypePickAll) => {
	const isCorrect = score === 100

	if (score === 'no-score') return 'Your response:'
	if (isTypePickAll && isCorrect) return 'A correct response:'
	if (isTypePickAll && !isCorrect) return 'An incorrect response:'
	if (!isTypePickAll && isCorrect) return 'Your correct response:'
	/*if (!isTypePickAll && !isCorrect)*/ return 'Your incorrect response:'
}

const MCChoice = props => {
	let score

	try {
		score = getQuestionScore(
			props.model,
			props.mode === MODE_REVIEW,
			props.moduleData.questionState,
			props.moduleData.navState.context
		)
	} catch (error) {
		// if there's no questionState data for this
		// or getting the score throws an error
		// just display a div
		return <div />
	}

	const isSelected = choiceIsSelected(
		props.moduleData.questionState,
		props.model,
		props.moduleData.navState.context
	)

	const ansType = getAnsType(props.model, score === 100, isSelected)
	const inputType = getInputType(props.responseType)

	let flag
	if (props.mode === MODE_REVIEW) {
		flag = renderAnswerFlag(ansType)
	}

	const className =
		'obojobo-draft--chunks--mc-assessment--mc-choice' +
		isOrNot(isSelected, 'selected') +
		isOrNot(score === 100, 'correct') +
		` is-type-${ansType}` +
		` is-mode-${props.mode}`

	return (
		<OboComponent
			model={props.model}
			moduleData={props.moduleData}
			className={className}
			tag="label"
		>
			<input
				type={inputType}
				value={props.model.get('id')}
				checked={isSelected}
				onChange={/* istanbul ignore next */ () => {}} // for react to not complain
				name={props.model.parent.get('id')}
				role={inputType}
				aria-checked={isSelected}
				disabled={props.mode === MODE_REVIEW}
			/>
			{isSelected && props.questionSubmitted && props.type !== MODE_REVIEW ? (
				<span className="for-screen-reader-only">
					{getChoiceText(score, props.responseType === TYPE_PICK_ALL)}
				</span>
			) : null}
			<div className="children">
				{props.model.children.map(child => {
					const type = child.get('type')
					const id = child.get('id')
					const Component = child.getComponentClass()

					switch (type) {
						case MCANSWER_NODE:
							return (
								<div key={id}>
									{flag}
									<Component key={id} model={child} moduleData={props.moduleData} />
								</div>
							)

						case MCFEEDBACK_NODE:
							return (
								<CSSTransition
									key={id}
									in={isSelected && props.questionSubmitted}
									classNames="feedback"
									timeout={TRANSITION_TIME_MS}
								>
									{isSelected && props.questionSubmitted ? (
										<div className="feedback">
											<Component model={child} moduleData={props.moduleData} />
										</div>
									) : (
										<span />
									)}
								</CSSTransition>
							)
					}

					return null
				})}
			</div>
		</OboComponent>
	)
}

MCChoice.defaultProps = {
	responseType: null,
	revealAll: false,
	questionSubmitted: false
}

export default MCChoice
