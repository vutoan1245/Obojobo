jest.mock('obojobo-document-engine/src/scripts/common/index', () => ({
	Registry: {
		registerModel: jest.fn()
	}
}))

jest.mock('./viewer-component', () => ({}))
jest.mock('./adapter', () => ({}))

jest.mock('./MCChoice/viewer', () => ({}))
jest.mock('./MCAnswer/viewer', () => ({}))
jest.mock('./MCFeedback/viewer', () => ({}))

const Common = require('obojobo-document-engine/src/scripts/common/index')

// include the script we're testing, it registers the model
import './viewer'
import ViewerComponent from './viewer-component'
import { MCASSESSMENT_NODE } from './constants'

describe(`${MCASSESSMENT_NODE} registration`, () => {
	test('registerModel registers expected vars', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		expect(register[0]).toBe(MCASSESSMENT_NODE)
		expect(register[1]).toHaveProperty('type', 'chunk')
		expect(register[1]).toHaveProperty('adapter', {})
		expect(register[1]).toHaveProperty('componentClass', ViewerComponent)
	})
})
