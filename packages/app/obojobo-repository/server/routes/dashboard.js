const express = require('express')
const router = express.Router()

// Home page
// mounted as /
router.get('/dashboard', (req, res) => {
	const props = {
		modulesImLearning: [
			{ id: 'sports', title: 'Sports Therapy' },
			{ id: 'pottery', title: 'Advanced 3d Pottery' },
			{ id: 'gravity', title: 'Gravitational Forces' },
			{ id: 'religion', title: 'World Religions' },
			{ id: 'hacker', title: 'Computer Science' },
		],
		modulesImWriting: [
			{ id: 'sports', title: 'Sports Therapy' },
			{ id: 'pottery', title: 'Advanced 3d Pottery' },
			{ id: 'gravity', title: 'Gravitational Forces' },
		],
		activityItems: [
			{ type: 'feedback', module: { id: 'space', title: 'Orbital Mechanics I'}, user: { id: 'men/16', name: 'Buzz Aldrin'}, time: '2 minutes ago', text: "It's good, needs more rendezvous"},
			{ type: 'scores', module: { id: 'space', title: 'Orbital Mechanics I'}, time: '1 hour ago', count: 10, average: {previous: 55, current: 67}},
			{ type: 'scores', module: { id: 'atmosphere', title: 'Exoplanetary Atmospheres'}, time: '2 hours ago', count: 3, average: {previous: 96, current: 92}},
			{ type: 'scores', module: { id: 'launch', title: 'Rocket Propulsion'}, time: '1 hour ago', count: 4, average: {previous: 88, current: 88}},
			{ type: 'edited', module: { id: 'mountains', title: 'Geological Liquification Mechanics'}, user: { id: 'men/33', name: 'Zach Berry'}, time: '3 days ago', pageCount: {previous: 5, current: 9}, questionCount: {previous: 10, current: 28}},
		],
		facts: [
			{ title: 'Modules', value: 12 },
			{ title: 'Students', value: 196 },
			{ title: 'Courses', value: 7 },
			{ title: 'Assignments', value: 23 },
		]
	}
	res.render('dashboard.jsx', props)
})

module.exports = router