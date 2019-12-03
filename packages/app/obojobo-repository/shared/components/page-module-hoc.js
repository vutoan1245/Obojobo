const PageModule = require('./page-module')
const connect = require('react-redux').connect
const { copyModule } = require('../actions/library-actions')
const mapStoreStateToProps = state => state
const mapActionsToProps = {
	copyModule
}

module.exports = connect(mapStoreStateToProps, mapActionsToProps)(PageModule)
