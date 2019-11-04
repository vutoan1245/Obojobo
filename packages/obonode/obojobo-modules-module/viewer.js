import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { MODULE_NODE } from './constants'

Common.Registry.registerModel(MODULE_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	default: true,
	type: 'module',
	getNavItem(model) {
		return {
			type: 'heading',
			label: model.title,
			showChildren: true
		}
	}
})
