import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Break from './editor-component'
import { NORMAL, LARGE } from './constants'

jest.mock(
	'obojobo-document-engine/src/scripts/oboeditor/components/node/editor-component',
	() => props => <div>{props.children}</div>
)

describe('Break Editor Node', () => {
	test('Node builds the expected component', () => {
		const component = renderer.create(
			<Break
				node={{
					data: {
						get: () => ({})
					}
				}}
			/>
		)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Node component toggles size to large', () => {
		const editor = {
			setNodeByKey: jest.fn()
		}

		const component = mount(
			<Break
				isSelected={true}
				node={{
					data: {
						get: () => ({ width: NORMAL })
					}
				}}
				editor={editor}
			/>
		)
		const tree = component.html()

		component.find('button').simulate('click') // toggle to large

		expect(tree).toMatchSnapshot()
	})

	test('Node component toggles size to normal', () => {
		const editor = {
			setNodeByKey: jest.fn()
		}

		const component = mount(
			<Break
				isSelected={true}
				node={{
					data: {
						get: () => ({ width: LARGE })
					}
				}}
				editor={editor}
			/>
		)
		const tree = component.html()

		component.find('button').simulate('click') // toggle to normal

		expect(tree).toMatchSnapshot()
	})
})
