module.exports = {
	obojobo: {
		migrations: 'server/migrations',
		expressMiddleware: 'server/index.js',
		clientScripts: {
			repository: 'client/repository.js',
			dashboard: 'client/dashboard.js',
			homepage: 'client/homepage.js',
			['page-module']: 'client/page-module.js'
		}
	}
}
