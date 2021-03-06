import './logo.scss'

import React from 'react'

import isOrNot from 'obojobo-document-engine/src/scripts/common/util/isornot'
import rd from './rd'

class Logo extends React.Component {
	constructor(props) {
		super(props)
		this.state = { clicks: 0 }
	}

	onClick() {
		this.setState({ clicks: this.state.clicks + 1 })
		if (this.state.clicks > 10) rd()
	}

	render() {
		return (
			<div
				onClick={this.onClick.bind(this)}
				className={`viewer--components--logo${isOrNot(this.props.inverted, 'inverted')}`}
			>
				Obojobo
			</div>
		)
	}
}

export default Logo
