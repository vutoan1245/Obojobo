import Module from './editor-registration'
import { MODULE_NODE } from './constants'

describe('Modules/Module editor', () => {
	test('registers model with expected values', () => {
		expect(Module).toHaveProperty('name', MODULE_NODE)
		expect(Module).toHaveProperty('menuLabel', 'Module')
		expect(Module).toHaveProperty('ignore', true)
		expect(Module).toHaveProperty('isInsertable', false)
		expect(Module).toHaveProperty('getNavItem')
	})

	test('getNavItem returns expected object', () => {
		const model = {
			title: 'TestTitle'
		}

		expect(Module.getNavItem(model)).toEqual({
			type: 'heading',
			label: 'TestTitle',
			showChildren: true
		})
	})
})
