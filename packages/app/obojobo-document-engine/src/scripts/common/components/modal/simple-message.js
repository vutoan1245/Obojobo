import React from 'react'

const SimpleMessage = props => (
	<React.Fragment>
		<p>{props.children}</p>
		<button onClick={props.modal.onButtonClick.bind(null, props.confirm)}>
			{props.buttonLabel || 'OK'}
		</button>
	</React.Fragment>
)

export default SimpleMessage
