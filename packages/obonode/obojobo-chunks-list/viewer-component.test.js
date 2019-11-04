import React from 'react'
import renderer from 'react-test-renderer'

import List from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { LIST_NODE, ORDERED, UNORDERED, SQUARE, UPPER_ALPHA } from './constants'

require('./viewer') // used to register this oboModel

describe('List', () => {
	test('List component', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: LIST_NODE,
			content: {
				textGroup: [],
				listStyles: {
					type: ORDERED,
					indents: {
						'2': {
							type: UNORDERED,
							bulletStyle: SQUARE
						},
						'4': {
							type: ORDERED,
							start: '10',
							bulletStyle: UPPER_ALPHA
						}
					}
				}
			}
		})

		const component = renderer.create(<List model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('List component with ascending indents', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: LIST_NODE,
			content: {
				textGroup: [
					{
						text: {
							value: 'One(indent=1)',
							styleList: []
						},
						data: {
							indent: '1'
						}
					},
					{
						text: {
							value: 'Two(indent=2)',
							styleList: []
						},
						data: {
							indent: '2'
						}
					},
					{
						text: {
							value: 'Three(indent=3)',
							styleList: []
						},
						data: {
							indent: '3'
						}
					},
					{
						text: {
							value: 'Four(indent=4)',
							styleList: []
						},
						data: {
							indent: '4'
						}
					},
					{
						text: {
							value: 'Five(indent=5)',
							styleList: []
						},
						data: {
							indent: '5'
						}
					},
					{
						text: {
							value: 'Six(indent=6)',
							styleList: []
						},
						data: {
							indent: '6'
						}
					}
				],
				listStyles: {
					type: ORDERED,
					indents: {
						'2': {
							type: UNORDERED,
							bulletStyle: SQUARE
						},
						'4': {
							type: ORDERED,
							start: '10',
							bulletStyle: UPPER_ALPHA
						}
					}
				}
			}
		})

		const component = renderer.create(<List model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('List component with inverse indentation', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: LIST_NODE,
			content: {
				textGroup: [
					{
						text: {
							value: 'One(indent=1)',
							styleList: []
						},
						data: '3'
					},
					{
						text: {
							value: 'Two(indent=2)',
							styleList: []
						},
						data: {
							indent: '2'
						}
					},
					{
						text: {
							value: 'Three(indent=6)',
							styleList: []
						},
						data: {
							indent: '1'
						}
					}
				],
				listStyles: {
					type: ORDERED,
					indents: {
						'2': {
							type: UNORDERED,
							bulletStyle: SQUARE
						},
						'4': {
							type: ORDERED,
							start: '10',
							bulletStyle: UPPER_ALPHA
						}
					}
				}
			}
		})

		const component = renderer.create(<List model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('List component with irregular indentation', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: LIST_NODE,
			content: {
				textGroup: [
					{
						text: {
							value: 'One(indent=1)',
							styleList: []
						},
						data: null
					},
					{
						text: {
							value: 'Two(indent=2)',
							styleList: []
						},
						data: {
							indent: '2'
						}
					},
					{
						text: {
							value: 'Three(indent=6)',
							styleList: []
						},
						data: {
							indent: '6'
						}
					},
					{
						text: {
							value: 'Four(indent=2)',
							styleList: []
						},
						data: {
							indent: '2'
						}
					},
					{
						text: {
							value: 'Five(indent=4)',
							styleList: []
						},
						data: {
							indent: '4'
						}
					},
					{
						text: {
							value: 'Six(indent=3)',
							styleList: []
						},
						data: {
							indent: '3'
						}
					}
				],
				listStyles: {
					type: ORDERED,
					indents: {
						'2': {
							type: UNORDERED,
							bulletStyle: SQUARE
						},
						'4': {
							type: ORDERED,
							start: '10',
							bulletStyle: UPPER_ALPHA
						}
					}
				}
			}
		})

		const component = renderer.create(<List model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
