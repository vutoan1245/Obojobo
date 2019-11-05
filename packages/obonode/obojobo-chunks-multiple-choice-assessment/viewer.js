import adapter from './adapter'
import Common from 'Common'
import ViewerComponent from './viewer-component'
import { MCASSESSMENT_NODE } from './constants'

import './MCAnswer/viewer'
import './MCChoice/viewer'
import './MCFeedback/viewer'

Common.Registry.registerModel(MCASSESSMENT_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk'
})
