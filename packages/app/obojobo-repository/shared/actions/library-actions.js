// =================== API =======================

const defaultOptions = () => ({
	method: 'GET',
	credentials: 'include',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

const COPY_MODULE = 'COPY_MODULE'
const apiCopyModule = searchString => {
	return fetch(`/api/users/search?q=${searchString}`, defaultOptions()).then(res => res.json())
}

const copyModule = (draftId, userId) => ({
	type: COPY_MODULE,
	promise: apiCopyModule(draftId, userId).then(result => console.log(result))
})

module.exports = { COPY_MODULE, copyModule }
