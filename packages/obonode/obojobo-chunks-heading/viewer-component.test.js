import React from 'react'
import renderer from 'react-test-renderer'

import Heading from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { HEADING_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('Heading', () => {
	test('Heading component', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: HEADING_NODE,
			content: {
				headingLevel: 1,
				textGroup: [
					{
						text: {
							value: 'Example Text'
						}
					}
				]
			}
		})

		const component = renderer.create(<Heading model={model} moduleData={moduleData} />)

		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('Heading component level 2', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: HEADING_NODE,
			content: {
				headingLevel: 2,
				textGroup: [
					{
						text: {
							value: 'Example Text'
						}
					}
				]
			}
		})

		const component = renderer.create(<Heading model={model} moduleData={moduleData} />)

		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('Heading component level 3', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: HEADING_NODE,
			content: {
				headingLevel: 3,
				textGroup: [
					{
						text: {
							value: 'Example Text'
						}
					}
				]
			}
		})

		const component = renderer.create(<Heading model={model} moduleData={moduleData} />)

		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
