import Store from '../../common/flux/store';
import Dispatcher from '../../common/flux/dispatcher';


class ModalStore extends Store {
	constructor() {
		super('modalstore');

		Dispatcher.on('modal:show', payload => {
			this._show(payload.value.component)
		});

		Dispatcher.on('modal:hide', this._hide.bind(this));
	}

	init() {
		return this.state = {
			modals: []
		};
	}

	_show(component) {
		this.state.modals.push(component);
		this.triggerChange();
	}

	_hide() {
		this.state.modals.shift();
		this.triggerChange();
	}

	getState() { return this.state; }

	setState(newState) { return this.state = newState; }
}


let modalStore = new ModalStore();
export default modalStore;
