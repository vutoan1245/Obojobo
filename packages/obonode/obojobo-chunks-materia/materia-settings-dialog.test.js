jest.mock('obojobo-document-engine/src/scripts/common/components/modal/settings-dialog', () => props => {
	return <mock-SettingsDialog {...props}></mock-SettingsDialog>
})
jest.mock('obojobo-document-engine/src/scripts/common/components/modal/settings-dialog-form', () => props => {
	return <mock-SettingsDialogForm {...props}></mock-SettingsDialogForm>
})
jest.mock('obojobo-document-engine/src/scripts/common/components/modal/settings-dialog-row', () => props => {
	return <mock-SettingsDialogRow {...props}></mock-SettingsDialogRow>
})
jest.mock('./materia-picker-dialog', () => props => {
	return <mock-MateriaPickerDialog {...props}></mock-MateriaPickerDialog>
})


import React from 'react'
import { mount } from 'enzyme'
// import TestRenderer from 'react-test-renderer'
import MateriaSettingsDialog from './materia-settings-dialog'


// mock ref.current.focus and ref.current.select on inputs
// const testRendererOptions = {
// 	createNodeMock: element => {
// 		if (element.type === 'input') {
// 			return {
// 				focus: () => {},
// 				select: () => {}
// 			}
// 		}
// 	}
// }

describe('MateriaSettingsDialog', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test.only('MateriaSettingsDialog component', () => {
		const component = mount(
			<MateriaSettingsDialog
				content={{
					icon: 'mock-icon',
					src: 'mock-src',
					content: {},
					caption: 'mock-caption',
					widgetEngine: 'mock-engine'
				}}
			/>
		)
		const tree = component.html()

		expect(tree).toMatchSnapshot()
	})

	// test('IFrameProperties component calls onConfirm from props', () => {
	// 	const onConfirm = jest.fn()

	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 			onConfirm={onConfirm}
	// 		/>
	// 	)

	// 	component
	// 		.find('button')
	// 		.at(1)
	// 		.simulate('click')

	// 	expect(onConfirm).toHaveBeenCalled()
	// })

	// test('IFrameProperties component focuses on first element', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	component.instance().focusOnFirstElement()

	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes title', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	component
	// 		.find('input')
	// 		.at(1)
	// 		.simulate('change', { target: { value: 'changed' } })

	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes src', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	component
	// 		.find('input')
	// 		.at(2)
	// 		.simulate('change', { target: { value: 'changed' } })

	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes border', () => {
	// 	const testRenderer = TestRenderer.create(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>,
	// 		testRendererOptions
	// 	)

	// 	const startState = testRenderer.toJSON()
	// 	expect(startState).toMatchSnapshot()

	// 	// locate the slider component for border input
	// 	const testInstance = testRenderer.root
	// 	const borderSlider = testInstance.findByProps({ title: 'Border' })

	// 	// execute that slider's handleCheckChange
	// 	borderSlider.props.handleCheckChange(true)

	// 	// capture the changes
	// 	const endState = testRenderer.toJSON()

	// 	// compare the snapshots
	// 	expect(endState).toMatchSnapshot()

	// 	expect(startState).not.toEqual(endState)
	// })

	// test('IFrameProperties component changes fit', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	component
	// 		.find('select')
	// 		.at(0)
	// 		.simulate('change', { target: { value: 'changed' } })

	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes width', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	const widthInput = component.find('input').at(3)
	// 	expect(widthInput.prop('placeholder')).toBe('Width')
	// 	expect(component.state().width).toBe(640)

	// 	widthInput.simulate('change', { target: { value: 600 } })
	// 	expect(component.state().width).toBe(600)
	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes height', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	const heightInput = component.find('input').at(4)
	// 	expect(heightInput.prop('placeholder')).toBe('Height')
	// 	expect(component.state().height).toBe(480)

	// 	heightInput.simulate('change', { target: { value: 999 } })
	// 	expect(component.state().height).toBe(999)
	// 	expect(component.html()).toMatchSnapshot()
	// })

	// // @TODO: fragile, relies on input ordering and difficult to read snapshot html dump
	// test('IFrameProperties component changes initial zoom', () => {
	// 	const component = mount(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>
	// 	)

	// 	const zoomInput = component.find('input').at(7)
	// 	expect(zoomInput.prop('placeholder')).toBe('Decimal Value')
	// 	zoomInput.simulate('change', { target: { value: 333 } })
	// 	expect(component.html()).toMatchSnapshot()
	// })

	// test('IFrameProperties component changes autoload', () => {
	// 	const testRenderer = TestRenderer.create(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>,
	// 		testRendererOptions
	// 	)

	// 	const startState = testRenderer.toJSON()
	// 	expect(startState).toMatchSnapshot()

	// 	// locate the slider component for border input
	// 	const testInstance = testRenderer.root
	// 	const autoloadSlider = testInstance.findByProps({ title: 'Autoload' })

	// 	// execute that slider's handleCheckChange
	// 	autoloadSlider.props.handleCheckChange(true)

	// 	// capture the changes
	// 	const endState = testRenderer.toJSON()

	// 	// compare the snapshots
	// 	expect(endState).toMatchSnapshot()

	// 	expect(startState).not.toEqual(endState)
	// })

	// test('IFrameProperties component changes Reload', () => {
	// 	const testRenderer = TestRenderer.create(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>,
	// 		testRendererOptions
	// 	)

	// 	const startState = testRenderer.toJSON()
	// 	expect(startState).toMatchSnapshot()

	// 	// locate the slider component for border input
	// 	const testInstance = testRenderer.root
	// 	const autoloadSlider = testInstance.findByProps({ title: 'Reload' })

	// 	// execute that slider's handleCheckChange
	// 	autoloadSlider.props.handleCheckChange(true)
	// 	expect(testInstance.instance.state.controls).toBe(',reload')

	// 	// capture the changes
	// 	const endState = testRenderer.toJSON()

	// 	// compare the snapshots
	// 	expect(endState).toMatchSnapshot()

	// 	expect(startState).not.toEqual(endState)

	// 	// turn it back off
	// 	autoloadSlider.props.handleCheckChange(false)
	// 	expect(testInstance.instance.state.controls).toBe('')
	// })

	// test('IFrameProperties component changes New Window', () => {
	// 	const testRenderer = TestRenderer.create(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>,
	// 		testRendererOptions
	// 	)

	// 	const startState = testRenderer.toJSON()
	// 	expect(startState).toMatchSnapshot()

	// 	// locate the slider component for border input
	// 	const testInstance = testRenderer.root
	// 	const autoloadSlider = testInstance.findByProps({ title: 'New Window' })

	// 	// execute that slider's handleCheckChange
	// 	autoloadSlider.props.handleCheckChange(true)

	// 	// capture the changes
	// 	const endState = testRenderer.toJSON()

	// 	// compare the snapshots
	// 	expect(endState).toMatchSnapshot()

	// 	expect(startState).not.toEqual(endState)
	// })

	// test('IFrameProperties component changes Zoom', () => {
	// 	const testRenderer = TestRenderer.create(
	// 		<IFrameProperties
	// 			content={{
	// 				controls: '',
	// 				border: false,
	// 				initialZoom: 1
	// 			}}
	// 		/>,
	// 		testRendererOptions
	// 	)

	// 	const startState = testRenderer.toJSON()
	// 	expect(startState).toMatchSnapshot()

	// 	// locate the slider component for border input
	// 	const testInstance = testRenderer.root
	// 	const autoloadSlider = testInstance.findByProps({ title: 'Zoom' })

	// 	// execute that slider's handleCheckChange
	// 	autoloadSlider.props.handleCheckChange(true)

	// 	// capture the changes
	// 	const endState = testRenderer.toJSON()

	// 	// compare the snapshots
	// 	expect(endState).toMatchSnapshot()

	// 	expect(startState).not.toEqual(endState)
	// })
})
