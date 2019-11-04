import { HTML_NODE } from './constants'

const schema = {
	blocks: {
		[HTML_NODE]: {
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
