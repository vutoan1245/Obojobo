import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { TEXT_NODE } from './constant'

Common.Registry.registerModel(TEXT_NODE, {
	adapter: Common.chunk.textChunk.TextGroupAdapter,
	componentClass: ViewerComponent,
	default: true,
	type: 'chunk'
})
