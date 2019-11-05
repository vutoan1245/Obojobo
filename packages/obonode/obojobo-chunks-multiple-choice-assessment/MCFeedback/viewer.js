import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { MCFEEDBACK_NODE } from '../constants'

Common.Registry.registerModel(MCFEEDBACK_NODE, {
	adapter: null,
	componentClass: ViewerComponent,
	type: 'chunk'
})
