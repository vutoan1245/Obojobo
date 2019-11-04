import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { QUESTION_BANK_NODE } from './constants'

Common.Registry.registerModel(QUESTION_BANK_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk'
})
