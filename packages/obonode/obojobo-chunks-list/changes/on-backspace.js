import { LIST_NODE, LIST_LEVEL_NODE } from '../constants'

const onBackspace = (event, editor, next) => {
	const last = editor.value.endBlock

	// If the block is not empty or we are deleting multiple things, delete normally
	if (!editor.value.selection.isCollapsed || last.text !== '') return next()

	// Get the deepest level that contains this line
	const listLevel = editor.value.document.getClosest(last.key, par => par.type === LIST_LEVEL_NODE)

	// levels with more than one child should delete normally
	if (listLevel.nodes.size > 1) return

	// Get the deepest level that holds the listLevel
	const oneLevelUp = editor.value.document.getClosest(
		listLevel.key,
		par => par.type === LIST_LEVEL_NODE
	)

	// If it is a nested item, move it up one layer
	if (oneLevelUp) {
		event.preventDefault()
		return editor.unwrapNodeByKey(last.key)
	}

	// If it is at the top level of an empty list, delete the whole list
	const parent = editor.value.document.getClosest(last.key, par => par.type === LIST_NODE)

	event.preventDefault()
	return editor.removeNodeByKey(parent.key)
}

export default onBackspace
