import { SELECT_SEQUENTIAL, SELECT_RANDOM, SELECT_RANDOM_UNSEEN } from './constants'

const Adapter = {
	construct(model) {
		model.setStateProp('choose', Infinity, p => parseInt(p, 10) || Infinity)
		model.setStateProp('select', SELECT_SEQUENTIAL, p => p, [
			SELECT_SEQUENTIAL,
			SELECT_RANDOM,
			SELECT_RANDOM_UNSEEN
		])
	},

	clone(model, clone) {
		clone.modelState.choose = model.modelState.choose
		clone.modelState.select = model.modelState.select
	},

	toJSON(model, json) {
		json.content.choose = model.modelState.choose
		json.content.select = model.modelState.select
	}
}

export default Adapter
