import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { ACTION_BUTTON_NODE } from './constants'

Common.Registry.registerModel(ACTION_BUTTON_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk'
})
