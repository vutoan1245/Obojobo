import { NORMAL } from './constants'

const slateToObo = node => ({
	id: node.key,
	type: node.type,
	children: [],
	content: {
		width: node.data.get('content').width
	}
})

const oboToSlate = node => {
	const content = node.content
	if (!content.width) content.width = NORMAL

	return {
		object: 'block',
		key: node.id,
		type: node.type,
		data: {
			content
		}
	}
}

export default { slateToObo, oboToSlate }
