import mcAssessmentResults from './mc-assessment-results'
import { MODE_SURVEY } from './constants'

describe('ObojoboDraft.Chunks.MCAssessment mc-assessment-results', () => {
	test.each([
		['default', 100, true, true],
		['default', 100, true, false],
		['default', 100, false, true],
		['default', 100, false, false],
		['default', 0, true, true],
		['default', 0, true, false],
		['default', 0, false, true],
		['default', 0, false, false],
		[MODE_SURVEY, 100, true, true],
		[MODE_SURVEY, 100, true, false],
		[MODE_SURVEY, 100, false, true],
		[MODE_SURVEY, 100, false, false],
		[MODE_SURVEY, 0, true, true],
		[MODE_SURVEY, 0, true, false],
		[MODE_SURVEY, 0, false, true],
		[MODE_SURVEY, 0, false, false]
	])(
		'type=%s, score=%i, isTypePickAll=%s, isForScreenReader=%s',
		(type, score, isTypePickAll, isForScreenReader) => {
			expect(
				mcAssessmentResults({
					type,
					score,
					isTypePickAll,
					isForScreenReader,
					correctLabel: 'mock-correct-label',
					incorrectLabel: 'mock-incorrect-label'
				})
			).toMatchSnapshot()
		}
	)
})
