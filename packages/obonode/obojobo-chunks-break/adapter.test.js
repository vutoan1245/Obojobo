jest.mock('obojobo-document-engine/src/scripts/common/models/obo-model', () => {
	return require('obojobo-document-engine/__mocks__/obo-model-adapter-mock').default
})
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'

import BreakAdapter from './adapter'
import { NORMAL, LARGE } from './constants'

describe('Break adapter', () => {
	test('construct builds without attributes', () => {
		const model = new OboModel({})
		const expected = { width: NORMAL }
		BreakAdapter.construct(model)

		expect(model.modelState).toEqual(expected)
	})

	test('construct builds with attributes', () => {
		const attrs = { content: { width: LARGE } }
		const model = new OboModel(attrs)

		const expected = { width: LARGE }
		BreakAdapter.construct(model, attrs)

		expect(model.modelState).toEqual(expected)
	})

	test('toText creates a text representation', () => {
		const model = { modelState: { width: LARGE } }
		const text = BreakAdapter.toText(model)

		expect(text).toEqual('---')
	})
})
