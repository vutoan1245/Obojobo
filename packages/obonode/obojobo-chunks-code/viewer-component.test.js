import React from 'react'
import renderer from 'react-test-renderer'

import Code from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { CODE_NODE } from './constants'

const chunkJSON = {
	id: 'id',
	type: CODE_NODE,
	content: {
		textGroup: [
			{
				text: {
					value: 'Example Text'
				}
			}
		]
	}
}

require('./viewer') // used to register this oboModel

describe('Code', () => {
	test('Code component', () => {
		const model = OboModel.create(chunkJSON)
		const moduleData = {
			focusState: {}
		}
		const component = renderer.create(<Code model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
