import React from 'react'
import renderer from 'react-test-renderer'

import Table from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import { TABLE_NODE } from './constants'

require('./viewer') // used to register this oboModel

describe('Table', () => {
	test('Table component', () => {
		const model = OboModel.create({
			id: 'id',
			type: TABLE_NODE,
			content: {
				header: true,
				textGroup: {
					numRows: 2,
					numCols: 2,
					textGroup: [
						{
							text: {
								value: '1'
							}
						},
						{
							text: {
								value: '2'
							}
						},
						{
							text: {
								value: '3'
							}
						},
						{
							text: {
								value: '4'
							}
						}
					]
				}
			}
		})
		const moduleData = {
			focusState: {}
		}

		const component = renderer.create(<Table model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Table component without header', () => {
		const model = OboModel.create({
			id: 'id',
			type: TABLE_NODE,
			content: {
				header: false,
				textGroup: {
					numRows: 2,
					numCols: 2,
					textGroup: [
						{
							text: {
								value: '1'
							}
						},
						{
							text: {
								value: '2'
							}
						},
						{
							text: {
								value: '3'
							}
						},
						{
							text: {
								value: '4'
							}
						}
					]
				}
			}
		})
		const moduleData = {
			focusState: {}
		}

		const component = renderer.create(<Table model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
