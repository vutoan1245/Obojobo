import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { MCANSWER_NODE } from '../constants'

Common.Registry.registerModel(MCANSWER_NODE, {
	adapter: null,
	componentClass: ViewerComponent,
	type: 'chunk'
})
