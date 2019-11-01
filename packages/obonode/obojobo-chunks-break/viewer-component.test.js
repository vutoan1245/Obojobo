import React from 'react'
import renderer from 'react-test-renderer'

import Break from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { BREAK_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('Break', () => {
	test('Break component with textGroup', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: BREAK_NODE
		})

		const component = renderer.create(<Break model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
