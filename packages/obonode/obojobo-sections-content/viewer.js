import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { CONTENT_NODE } from './constants'

Common.Registry.registerModel(CONTENT_NODE, {
	adapter: null,
	componentClass: ViewerComponent,
	default: true,
	type: 'section',
	getNavItem: () => ({
		type: 'hidden',
		showChildren: true
	})
})
