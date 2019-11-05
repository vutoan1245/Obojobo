const MCASSESSMENT_NODE = 'ObojoboDraft.Chunks.MCAssessment'
const MCANSWER_NODE = 'ObojoboDraft.Chunks.MCAssessment.MCAnswer'
const MCCHOICE_NODE = 'ObojoboDraft.Chunks.MCAssessment.MCChoice'
const MCFEEDBACK_NODE = 'ObojoboDraft.Chunks.MCAssessment.MCFeedback'
const SETTINGS_NODE = 'ObojoboDraft.Chunks.MCAssessment.Settings'
const CHOICE_LIST_NODE = 'ObojoboDraft.Chunks.MCAssessment.ChoiceList'

const TYPE_PICK_ONE = 'pick-one'
const TYPE_MULTI_CORRECT = 'pick-one-multiple-correct'
const TYPE_PICK_ALL = 'pick-all'
const MODE_REVIEW = 'review'
const MODE_SURVEY = 'survey'
const MODE_PRACTICE = 'practice'

const DEFAULT_CORRECT_PRACTICE_LABELS = ['Correct!', 'You got it!', 'Great job!', "That's right!"]
const DEFAULT_CORRECT_REVIEW_LABELS = ['Correct']
const DEFAULT_INCORRECT_LABELS = ['Incorrect']
const DEFAULT_INCORRECT_REVIEW_LABELS = ['Incorrect']
const DEFAULT_SURVEY_LABELS = ['Response recorded']
const DEFAULT_SURVEY_REVIEW_LABELS = ['Response recorded']
const DEFAULT_SURVEY_UNANSWERED_LABELS = ['No response given']

export {
	MCASSESSMENT_NODE,
	MCANSWER_NODE,
	MCCHOICE_NODE,
	MCFEEDBACK_NODE,
	SETTINGS_NODE,
	CHOICE_LIST_NODE,
	TYPE_PICK_ONE,
	TYPE_MULTI_CORRECT,
	TYPE_PICK_ALL,
	MODE_REVIEW,
	MODE_SURVEY,
	MODE_PRACTICE,
	DEFAULT_CORRECT_PRACTICE_LABELS,
	DEFAULT_CORRECT_REVIEW_LABELS,
	DEFAULT_INCORRECT_LABELS,
	DEFAULT_INCORRECT_REVIEW_LABELS,
	DEFAULT_SURVEY_LABELS,
	DEFAULT_SURVEY_REVIEW_LABELS,
	DEFAULT_SURVEY_UNANSWERED_LABELS
}
