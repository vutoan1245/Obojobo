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
		.createTable('drafts_metadata', {
			draft_id: {
				type: 'UUID',
				notNull: true
			},
			created_at: {
				type: 'timestamp WITH TIME ZONE',
				notNull: true,
				defaultValue: new String('now()')
			},
			updated_at: {
				type: 'timestamp WITH TIME ZONE',
				notNull: true,
				defaultValue: new String('now()')
			},
			key: {
				type: 'varchar',
				notNull: true
			},
			value: {
				type: 'varchar',
				notNull: true
			}
		})
		.then(() => db.addIndex('drafts_metadata', 'draft_id', ['draft_id', 'key'], true))
}

exports.down = function(db) {
	return db.dropTable('drafts_metadata')
}

exports._meta = {
	version: 1
}
