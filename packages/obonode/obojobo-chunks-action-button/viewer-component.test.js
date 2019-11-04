import React from 'react'
import renderer from 'react-test-renderer'

import ActionButton from './viewer-component'
import OboModel from 'obojobo-document-engine/src/scripts/common/models/obo-model'
import focus from 'obojobo-document-engine/src/scripts/common/page/focus'
import { ACTION_BUTTON_NODE } from './constants'

jest.mock('obojobo-document-engine/src/scripts/common/page/focus')

require('./viewer') // used to register this oboModel

describe('ActionButton', () => {
	test('ActionButton component with textGroup', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: ACTION_BUTTON_NODE,
			content: {
				textGroup: [
					{
						text: {
							value: 'Example Text'
						}
					}
				]
			}
		})

		const component = renderer.create(<ActionButton model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('ActionButton component with label', () => {
		const moduleData = {
			focusState: {}
		}
		const model = OboModel.create({
			id: 'id',
			type: ACTION_BUTTON_NODE,
			content: {
				label: 'Example Label'
			}
		})

		const component = renderer.create(<ActionButton model={model} moduleData={moduleData} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('ActionButton focusOnContent calls focus on the button element', () => {
		const mockButtonEl = jest.fn()
		const model = {
			getDomEl: () => ({
				querySelector: () => mockButtonEl
			})
		}

		ActionButton.focusOnContent(model)

		expect(focus).toHaveBeenCalledWith(mockButtonEl)
	})
})
