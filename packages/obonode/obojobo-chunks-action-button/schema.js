import { ACTION_BUTTON_NODE } from './constants'

const schema = {
	blocks: {
		[ACTION_BUTTON_NODE]: {
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
