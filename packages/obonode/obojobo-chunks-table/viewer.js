import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { TABLE_NODE } from './constants'

Common.Registry.registerModel(TABLE_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk'
})
