import './editor-component.scss'

import React from 'react'

const Settings = props => (
	<div className={'qb-settings'}>
		<React.Fragment>{props.children}</React.Fragment>
	</div>
)

export default Settings
