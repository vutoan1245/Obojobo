import React from 'react'
import renderer from 'react-test-renderer'

import YouTube from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { YOUTUBE_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('YouTube', () => {
	test('YouTube component', () => {
		const model = OboModel.create({
			id: 'id',
			type: YOUTUBE_NODE,
			content: {
				videoId: 'dQw4w9WgXcQ'
			}
		})
		const moduleData = {
			focusState: {}
		}

		const component = renderer.create(<YouTube model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
