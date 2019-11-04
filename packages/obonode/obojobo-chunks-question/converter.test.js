jest.mock('obojobo-document-engine/src/scripts/common/index', () => ({
	Registry: {
		getItemForType: () => ({
			slateToObo: args => ({ mock: 'slateToObo', args }),
			oboToSlate: args => ({ mock: 'oboToSlate', args })
		})
	},
	components: {
		modal: {
			SimpleDialog: () => 'SimpleDialog'
		}
	},
	util: {
		ModalUtil: {}
	}
}))

import Converter from './converter'
import { SOLUTION_NODE, MCASSESSMENT_NODE, BREAK_NODE } from './constants'

describe('Question editor', () => {
	test('slateToObo converts a Slate node to an OboNode with content', () => {
		const slateNode = {
			key: 'mockKey',
			type: 'mockType',
			data: {
				get: () => null
			},
			nodes: [
				{
					type: 'oboeditor.component',
					nodes: [
						{
							type: 'mockNode'
						}
					]
				},
				{
					type: MCASSESSMENT_NODE
				},
				{
					type: SOLUTION_NODE,
					nodes: {
						get: () => ({
							type: 'oboeditor.component',
							nodes: [
								{
									type: 'mockNode'
								}
							]
						})
					}
				}
			]
		}
		const oboNode = Converter.slateToObo(slateNode)

		expect(oboNode).toMatchSnapshot()
	})

	test('oboToSlate converts an OboNode to a Slate node', () => {
		const oboNode = {
			id: 'mockKey',
			type: 'mockType',
			children: [
				{
					type: BREAK_NODE
				},
				{
					type: MCASSESSMENT_NODE
				}
			],
			content: { solution: {} }
		}
		const slateNode = Converter.oboToSlate(oboNode)

		expect(slateNode).toMatchSnapshot()
	})

	test('oboToSlate converts an OboNode to a Slate node without a solution', () => {
		const oboNode = {
			id: 'mockKey',
			type: 'mockType',
			children: [
				{
					type: BREAK_NODE
				},
				{
					type: MCASSESSMENT_NODE
				}
			],
			content: {}
		}
		const slateNode = Converter.oboToSlate(oboNode)

		expect(slateNode).toMatchSnapshot()
	})
})
