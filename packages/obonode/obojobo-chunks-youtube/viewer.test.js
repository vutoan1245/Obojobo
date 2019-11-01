jest.mock('obojobo-document-engine/src/scripts/common/index', () => ({
	Registry: {
		registerModel: jest.fn()
	}
}))

jest.mock('./viewer-component', () => ({}))
jest.mock('./adapter', () => ({}))

import Common from 'obojobo-document-engine/src/scripts/common/index'
import { YOUTUBE_NODE } from './constants'

// include the script we're testing, it registers the model
import './viewer'
import ViewerComponent from './viewer-component'

describe(`${YOUTUBE_NODE} registration`, () => {
	test('registerModel registers expected vars', () => {
		const register = Common.Registry.registerModel.mock.calls[0]
		expect(register[0]).toBe(YOUTUBE_NODE)
		expect(register[1]).toHaveProperty('type', 'chunk')
		expect(register[1]).toHaveProperty('adapter', {})
		expect(register[1]).toHaveProperty('componentClass', ViewerComponent)
	})
})
