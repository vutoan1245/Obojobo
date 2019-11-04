import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { HEADING_NODE } from './constants'

Common.Registry.registerModel(HEADING_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk',
	getNavItem(model) {
		switch (model.modelState.headingLevel) {
			// when 1
			// 	type: 'link',
			// 	label: model.modelState.textGroup.first.text.value,
			// 	path: [model.modelState.textGroup.first.text.value.toLowerCase().replace(/ /g, '-')],
			// 	showChildren: false

			case 1:
			case 2:
				if (model.modelState.headingLevel === 1 && model.getIndex() === 0) {
					return null
				}

				return {
					type: 'sub-link',
					label: model.modelState.textGroup.first.text,
					path: [
						model
							.toText()
							.toLowerCase()
							.replace(/ /g, '-')
					],
					showChildren: false
				}

			default:
				return null
		}
	}
})
