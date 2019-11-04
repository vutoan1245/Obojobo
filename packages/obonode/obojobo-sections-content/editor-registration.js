import { CONTENT_NODE } from './constants'

const Content = {
	name: CONTENT_NODE,
	ignore: true,
	isInsertable: false,
	plugins: null,
	helpers: {
		slateToObo: () => {},
		oboToSlate: () => {}
	},
	getNavItem: () => ({
		type: 'hidden',
		showChildren: true
	})
}

export default Content
