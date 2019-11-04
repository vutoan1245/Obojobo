import { HEADING_NODE } from './constants'

const schema = {
	blocks: {
		[HEADING_NODE]: {
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
