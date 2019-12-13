const router = require('express').Router() //eslint-disable-line new-cap
const RepositoryCollection = require('../models/collection')
const Draft = require('obojobo-express/models/draft')
const DraftSummary = require('../models/draft_summary')
const DraftsMetadata = require('../models/drafts_metadata')
const {
	requireCanPreviewDrafts,
	requireCurrentUser,
	requireCurrentDocument
} = require('obojobo-express/express_validators')
const UserModel = require('obojobo-express/models/user')
const db = require('obojobo-express/db')
const uuid = require('uuid')

const resultsToUsers = results => {
	return results.map(u => {
		return new UserModel({
			id: u.id,
			firstName: u.first_name,
			lastName: u.last_name,
			email: u.email,
			username: u.username,
			createdAt: u.created_at,
			roles: u.roles
		})
	})
}

// List public drafts
router.route('/drafts-public').get((req, res) => {
	const publicLibCollectionId = '00000000-0000-0000-0000-000000000000'
	return RepositoryCollection.fetchById(publicLibCollectionId)
		.then(collection => collection.loadRelatedDrafts())
		.then(collection => {
			res.success(collection.drafts)
		})
		.catch(res.unexpected)
})

// List my drafts
// mounted as /api/drafts
router
	.route('/drafts')
	.get([requireCurrentUser, requireCanPreviewDrafts])
	.get((req, res) => {
		return DraftSummary.fetchByUserId(req.currentUser.id)
			.then(res.success)
			.catch(res.unexpected)
	})

router
	.route('/users/search')
	.get([requireCurrentUser, requireCanPreviewDrafts])
	.get((req, res) => {
		if (!req.query.q || !req.query.q.trim()) {
			res.success([])
			return
		}
		const search = `%${req.query.q}%`
		return db
			.none(
				`CREATE OR REPLACE FUNCTION obo_immutable_concat_ws(s text, t1 text, t2 text)
				RETURNS text AS
				$func$
				SELECT concat_ws(s, t1, t2)
				$func$ LANGUAGE sql IMMUTABLE;

				`
			)
			.then(() => {
				return db.manyOrNone(
					`SELECT * FROM users WHERE obo_immutable_concat_ws(' ', first_name, last_name) ILIKE $[search] OR email ILIKE $[search] OR username ILIKE $[search] ORDER BY first_name, last_name LIMIT 25`,
					{ search }
				)
			})
			.then(searchResults => {
				res.success(resultsToUsers(searchResults))
			})
			.catch(res.unexpected)
	})

// Copy a public draft to current user
// mounted as /api/drafts/:draftId/copy/
router
	.route('/drafts/:draftId/copy/')
	.get([requireCanPreviewDrafts, requireCurrentUser])
	.get(async (req, res) => {
		try {
			const userId = req.currentUser.id
			const draftId = req.params.draftId

			const oldDraft = await Draft.fetchById(draftId)
			const newDraft = await Draft.createWithContent(userId, oldDraft.root.toObject())

			const draftMetadata = new DraftsMetadata({
				draft_id: newDraft.id,
				key: 'copied',
				value: draftId
			})
			await draftMetadata.saveOrCreate()

			res.success()
		} catch (e) {
			res.unexpected(e)
		}
	})

// list a draft's permissions
router
	.route('/drafts/:draftId/permission')
	.get([requireCurrentUser, requireCurrentDocument, requireCanPreviewDrafts])
	.get((req, res) => {
		return db
			.manyOrNone(
				`SELECT users.* FROM repository_map_user_to_draft JOIN users ON users.id = user_id WHERE draft_id = $[draft_id] ORDER BY users.first_name, users.last_name`,
				{ draft_id: req.params.draftId }
			)
			.then(permsResult => {
				res.success(resultsToUsers(permsResult))
			})
			.catch(res.unexpected)
	})

// add a permission for a user to a draft
// @TODO: make sure the user adding the permission has permission
// @TODO: make sure the user being added exists
router
	.route('/drafts/:draftId/permission')
	.post([requireCurrentUser, requireCurrentDocument /*requireCanPreviewDrafts*/])
	.post((req, res) => {
		return Promise.resolve()
			.then(() => {
				const userId = req.body.userId
				const draftId = req.currentDocument.draftId
				return db.none(
					`INSERT INTO repository_map_user_to_draft (draft_id, user_id) VALUES($[draftId], $[userId]) ON CONFLICT DO NOTHING`,
					{ userId, draftId }
				)
			})
			.then(() => {
				res.success()
			})
			.catch(res.unexpected)
	})

// delete a permission for a user to a draft
// @TODO: make sure the user removing the permission has permission
router
	.route('/drafts/:draftId/permission/:userId')
	.delete([requireCurrentUser, requireCurrentDocument /*requireCanPreviewDrafts*/])
	.delete((req, res) => {
		return UserModel.fetchById(req.params.userId)
			.then(user => {
				const userId = user.id
				const draftId = req.currentDocument.draftId
				return db.none(
					`DELETE FROM repository_map_user_to_draft WHERE draft_id = $[draftId] AND user_id = $[userId]`,
					{ userId, draftId }
				)
			})
			.then(() => {
				res.success()
			})
			.catch(res.unexpected)
	})

module.exports = router
