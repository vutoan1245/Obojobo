import { FIGURE_NODE } from './constants'

const schema = {
	blocks: {
		[FIGURE_NODE]: {
			nodes: [
				{
					match: [{ object: 'text' }],
					min: 1,
					max: 1
				}
			]
		}
	}
}

export default schema
