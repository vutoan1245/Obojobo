import React from 'react'
import renderer from 'react-test-renderer'

import Figure from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { FIGURE_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('Figure', () => {
	test('Figure component', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: FIGURE_NODE,
			content: {
				alt: 'Alt Text',
				url: 'www.example.com/img.jpg',
				size: 'custom',
				width: '500',
				height: '400',
				textGroup: [
					{
						text: {
							value: 'Example Text'
						}
					}
				]
			}
		})

		const component = renderer.create(<Figure model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Figure component with no textGroup', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: FIGURE_NODE,
			content: {
				alt: 'Alt Text',
				url: 'www.example.com/img.jpg',
				size: 'custom',
				width: '500',
				height: '400'
			}
		})
		const component = renderer.create(<Figure model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
