import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { HTML_NODE } from './constants'

Common.Registry.registerModel(HTML_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk'
})
