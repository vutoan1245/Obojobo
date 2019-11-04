import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { PAGE_NODE } from './constants'

Common.Registry.registerModel(PAGE_NODE, {
	componentClass: ViewerComponent,
	default: true,
	type: 'page',
	getNavItem(model) {
		let label

		if (model.title) {
			label = model.title.toString()
		} else {
			const pages = model.parent.children.models.filter(child => child.get('type') === PAGE_NODE)
			label = `Page ${pages.indexOf(model) + 1}`
		}

		return {
			type: 'link',
			label,
			contentType: 'Page',
			path: [label.toLowerCase().replace(/ /g, '-')],
			showChildren: false
		}
	}
})
