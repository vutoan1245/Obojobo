import { MODULE_NODE } from './constants'

const Module = {
	name: MODULE_NODE,
	menuLabel: 'Module',
	ignore: true,
	isInsertable: false,
	getNavItem(model) {
		return {
			type: 'heading',
			label: model.title,
			showChildren: true
		}
	}
}

export default Module
