import { LIST_LEVEL_NODE } from '../constants'

const wrapLevel = (event, editor) => {
	event.preventDefault()
	return editor.unwrapBlock(LIST_LEVEL_NODE)
}

export default wrapLevel
