let items,
	itemsLoaded,
	getItemsCallbacks,
	defaults,
	insertItems,
	registeredToolbarItems,
	toolbarItems,
	textListeners,
	variableHandlers

class _Store {
	init() {
		items = new Map()
		itemsLoaded = 0
		getItemsCallbacks = []
		defaults = new Map()
		insertItems = new Map()
		toolbarItems = []
		textListeners = []
		variableHandlers = new Map()
		registeredToolbarItems = {
			separator: { id: 'separator', type: 'separator' }
		}
	}

	loadDependency(url, onLoadCallback) {
		if (onLoadCallback == null) {
			onLoadCallback = function() {}
		}
		const type = url.substr(url.lastIndexOf('.') + 1)

		switch (type) {
			case 'js':
				let el = document.createElement('script')
				el.setAttribute('src', url)
				el.onload = onLoadCallback
				document.head.appendChild(el)
				break

			case 'css':
				el = document.createElement('link')
				el.setAttribute('rel', 'stylesheet')
				el.setAttribute('href', url)
				document.head.appendChild(el)
				onLoadCallback()
				break
		}

		return this
	}

	registerModel(className, opts) {
		if (opts == null) {
			opts = {}
		}
		items.set(className, opts)

		opts = Object.assign(
			{
				type: null,
				default: false,
				insertItem: null,
				componentClass: null,
				selectionHandler: null,
				commandHandler: null,
				variables: {},
				init() {}
			},
			opts
		)

		if (opts.default) {
			defaults.set(opts.type, className)
		}

		opts.init()

		for (const variable in opts.variables) {
			const cb = opts.variables[variable]
			variableHandlers.set(variable, cb)
		}

		return this
	}

	getDefaultItemForModelType(modelType) {
		const type = defaults.get(modelType)
		if (!type) {
			return null
		}

		return items.get(type)
	}

	getItemForType(type) {
		return items.get(type)
	}

	registerToolbarItem(opts) {
		registeredToolbarItems[opts.id] = opts
		return this
	}

	addToolbarItem(id) {
		toolbarItems.push(Object.assign({}, registeredToolbarItems[id]))
		return this
	}

	getItems(callback) {
		// if (itemsLoaded === items.size) {
		// 	callback(items)
		// } else {
		// 	getItemsCallbacks.push(callback)
		// }

		// return null

		callback(items)
	}

	getTextForVariable(variable, model, viewerState) {
		const cb = variableHandlers.get(variable)
		if (!cb) {
			return null
		}

		return cb.call(null, model, viewerState)
	}

	// get insertItems() {
	// 	return insertItems
	// }

	get registeredToolbarItems() {
		return registeredToolbarItems
	}

	get toolbarItems() {
		return toolbarItems
	}

	// get textListeners() {
	// 	return textListeners
	// }
}

const Store = new _Store()

Store.init()
export { Store }
