import React from 'react'
import renderer from 'react-test-renderer'

import Level from './editor-component'
import { ALPHA, ORDERED, UNORDERED, SQUARE } from '../../constants'

describe('List editor', () => {
	test('Level component', () => {
		const component = renderer.create(
			<Level
				node={{
					data: {
						get: () => {
							return { bulletStyle: SQUARE, type: UNORDERED }
						}
					}
				}}
			/>
		)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Level component ordered', () => {
		const component = renderer.create(
			<Level
				node={{
					data: {
						get: () => {
							return { bulletStyle: ALPHA, type: ORDERED }
						}
					}
				}}
			/>
		)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
