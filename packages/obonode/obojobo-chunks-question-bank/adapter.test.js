jest.mock('obojobo-document-engine/src/scripts/common/models/obo-model', () => {
	return require('obojobo-document-engine/__mocks__/obo-model-adapter-mock').default
})
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'

import QuestionBankAdapter from './adapter'
import { SELECT_RANDOM } from './constants'

describe('QuestionBank adapter', () => {
	test('construct builds without attributes', () => {
		const model = new OboModel({})
		QuestionBankAdapter.construct(model)
		expect(model.modelState).toMatchSnapshot()
	})

	test('construct builds with attributes', () => {
		const attrs = {
			content: {
				choose: 2,
				select: SELECT_RANDOM
			}
		}
		const model = new OboModel(attrs)

		QuestionBankAdapter.construct(model, attrs)
		expect(model.modelState).toMatchSnapshot()
	})

	test('construct allows choose to be Infinity', () => {
		const attrs = {
			content: {
				choose: Infinity,
				select: SELECT_RANDOM
			}
		}
		const model = new OboModel(attrs)

		QuestionBankAdapter.construct(model, attrs)
		expect(model.modelState.choose).toBe(Infinity)
		expect(model.modelState).toMatchSnapshot()
	})

	test('clone creates a copy', () => {
		const attrs = {
			content: {
				choose: 2,
				select: SELECT_RANDOM
			}
		}
		const modelA = new OboModel(attrs)
		const modelB = new OboModel({})

		QuestionBankAdapter.construct(modelA, attrs)
		QuestionBankAdapter.clone(modelA, modelB)

		expect(modelA.modelState).not.toBe(modelB.modelState)
		expect(modelA.modelState).toEqual(modelB.modelState)
	})

	test('toJSON builds a JSON representation', () => {
		const json = { content: {} }
		const attrs = {
			content: {
				choose: 2,
				select: SELECT_RANDOM
			}
		}
		const model = new OboModel(attrs)

		QuestionBankAdapter.construct(model, attrs)
		QuestionBankAdapter.toJSON(model, json)

		expect(json).toMatchSnapshot()
	})
})
