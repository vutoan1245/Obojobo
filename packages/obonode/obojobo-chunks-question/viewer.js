import adapter from './adapter'
import Common from 'obojobo-document-engine/src/scripts/common'
import ViewerComponent from './viewer-component'
import { QUESTION_NODE } from './constants'

Common.Registry.registerModel(QUESTION_NODE, {
	adapter: adapter,
	componentClass: ViewerComponent,
	type: 'chunk',
	getNavItem(model) {
		const questions = model.parent.children.models.filter(
			child => child.get('type') === QUESTION_NODE
		)
		const label = model.title || `Question ${questions.indexOf(model) + 1}`

		return {
			type: 'sub-link',
			label,
			path: [`#obo-${model.get('id')}`]
		}
	}
})
