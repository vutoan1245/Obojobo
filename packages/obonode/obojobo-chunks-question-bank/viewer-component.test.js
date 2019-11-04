import React from 'react'
import renderer from 'react-test-renderer'

import QuestionBank from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { QUESTION_BANK_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('QuestionBank', () => {
	test('QuestionBank component', () => {
		const model = OboModel.create({
			id: 'id',
			type: QUESTION_BANK_NODE,
			children: [
				{
					id: 'child-id',
					type: QUESTION_BANK_NODE
				}
			]
		})

		const moduleData = {
			focusState: {}
		}

		const component = renderer.create(<QuestionBank model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
