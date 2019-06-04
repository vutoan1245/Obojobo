import './viewer-component.scss'
import './editor-component.scss'

import React from 'react'
import Common from 'obojobo-document-engine/src/scripts/common'

import NewActionModal from './new-action-modal'

const { ModalUtil } = Common.util
const { Button } = Common.components

const Trigger = props => {
	return (
		<div className="trigger" key={props.type}>
			<span>{props.type}</span>
			<span>{props.value}</span>
			<Button className="delete-button" onClick={props.update}>
				×
			</Button>
		</div>
	)
}

class ActionButton extends React.Component {
	constructor(props) {
		super(props)
	}

	showAddActionModal() {
		ModalUtil.show(<NewActionModal onConfirm={this.addAction.bind(this)} />)
	}

	addAction(newAction) {
		const editor = this.props.editor
		const content = this.props.node.data.get('content')

		content.actions.push(newAction)

		return editor.setNodeByKey(this.props.node.key, {
			data: { content }
		})
	}

	removeAction(index) {
		const editor = this.props.editor
		const content = this.props.node.data.get('content')

		content.actions.splice(index, 1)

		return editor.setNodeByKey(this.props.node.key, {
			data: { content }
		})
	}

	renderTriggers() {
		const content = this.props.node.data.get('content')
		return (
			<div className="trigger-box" contentEditable={false}>
				Button Actions:
				{content.actions.map((action, index) => {
					return (
						<Trigger
							type={action.type}
							value={action.value}
							key={action.type}
							parent={content.actions}
							update={() => this.removeAction(index)}
						/>
					)
				})}
				<Button className="add-action" onClick={this.showAddActionModal.bind(this)}>
					+ Add New Action
				</Button>
			</div>
		)
	}

	render() {
		const { isSelected } = this.props

		return (
			<div className="text-chunk obojobo-draft--chunks--action-button pad">
				<div className="obojobo-draft--components--button align-center">
					<div className="button">{this.props.children}</div>
				</div>
				{isSelected ? this.renderTriggers() : null}
			</div>
		)
	}
}

export default ActionButton
