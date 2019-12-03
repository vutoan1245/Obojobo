'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
	dbm = options.dbmigrate
	type = dbm.dataType
	seed = seedLink
}

exports.up = function(db) {
	return db
		.createTable('draft_copy_from', {
			new_draft_id: {
				type: 'UUID',
				primaryKey: true,
				defaultValue: new String('uuid_generate_v4()')
			},
			old_draft_id: {
				type: 'UUID',
				defaultValue: new String('uuid_generate_v4()')
			},
			created_at: {
				type: 'timestamp WITH TIME ZONE',
				notNull: true,
				defaultValue: new String('now()')
			}
		})
		.then(() => db.addIndex('draft_copy_from', 'new_draft_id', ['old_draft_id']))
}

exports.down = function(db) {
	return db.dropTable('draft_copy_from')
}

exports._meta = {
	version: 1
}
