import TextUtil from 'obojobo-document-engine/src/scripts/oboeditor/util/text-util'
import { TEXT_LINE_NODE } from './constant'

const slateToObo = node => {
	const textGroup = node.nodes.map(line => {
		const textLine = {
			text: { value: line.text, styleList: [] },
			data: { indent: line.data.get('indent'), align: line.data.get('align') }
		}

		line.nodes.forEach(text => {
			TextUtil.slateToOboText(text, textLine)
		})

		return textLine
	})

	return {
		id: node.key,
		type: node.type,
		children: [],
		content: {
			textGroup
		}
	}
}

const oboToSlate = node => {
	const nodes = node.content.textGroup.map(line => {
		const indent = line.data ? line.data.indent : 0
		const align = line.data ? line.data.align : 'left'
		const textLine = {
			object: 'block',
			type: TEXT_LINE_NODE,
			data: { indent, align },
			nodes: [
				{
					object: 'text',
					leaves: TextUtil.parseMarkings(line)
				}
			]
		}

		return textLine
	})

	return {
		object: 'block',
		key: node.id,
		type: node.type,
		nodes,
		data: {
			content: {}
		}
	}
}

export default { slateToObo, oboToSlate }
