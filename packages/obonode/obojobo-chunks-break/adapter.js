import { NORMAL, LARGE } from './constants'

const Adapter = {
	construct(model) {
		model.setStateProp('width', NORMAL, p => p.toLowerCase(), [NORMAL, LARGE])
	},

	toText() {
		return '---'
	}
}

export default Adapter
