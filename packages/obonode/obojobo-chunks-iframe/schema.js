import { IFRAME_NODE } from './constants'

const schema = {
	blocks: {
		[IFRAME_NODE]: {
			isVoid: true
		}
	}
}

export default schema
