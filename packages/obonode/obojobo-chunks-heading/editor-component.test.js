import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Transforms } from 'slate'
jest.mock('slate')
jest.mock('slate-react')

import Heading from './editor-component'

jest.mock(
	'obojobo-document-engine/src/scripts/oboeditor/components/node/with-slate-wrapper',
	() => item => item
)
jest.mock(
	'obojobo-document-engine/src/scripts/oboeditor/components/node/editor-component',
	() => props => <div>{props.children}</div>
)

describe('Heading Editor Node', () => {
	test('Heading component', () => {
		const component = renderer.create(<Heading element={{ content: {} }} />)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('Heading component calls Transforms.select for triple-click', () => {
		const component = mount(<Heading element={{ content: {} }} />)

		// Double click
		component
			.find('.obojobo-draft--chunks--heading')
			.at(0)
			.simulate('click', { detail: 2 })
		expect(Transforms.select).toHaveBeenCalledTimes(0)

		// Triple click
		component
			.find('.obojobo-draft--chunks--heading')
			.at(0)
			.simulate('click', { detail: 3 })
		expect(Transforms.select).toHaveBeenCalledTimes(1)
	})
})
