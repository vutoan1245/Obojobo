import './image-properties-modal.scss'

import React from 'react'

import Common from 'obojobo-document-engine/src/scripts/common'
import ChooseImageModal from './choose-image-modal'
import Image from './image'
import { isUUID } from './utils'

const { SimpleDialog } = Common.components.modal
const { Button } = Common.components

class ImageProperties extends React.Component {
	constructor(props) {
		super(props)
		this.inputRef = React.createRef()
		this.state = {
			url: '',
			alt: '',
			size: 100,
			height: 100,
			width: 100,
			isChoosingImage: !this.props.content.url && this.props.content.url !== '',
			urlInputText: isUUID(props.content.url) ? null : props.content.url,
			...props.content
		}

		// optimize bound functions by
		this.onCheckSize = this.onCheckSize.bind(this)
		this.handleHeightTextChange = this.handleHeightTextChange.bind(this)
		this.handleWidthTextChange = this.handleWidthTextChange.bind(this)
		this.focusOnFirstElement = this.focusOnFirstElement.bind(this)
		this.handleAltTextChange = this.handleAltTextChange.bind(this)
		this.onOpenChoosingImageModal = this.onOpenChoosingImageModal.bind(this)
	}

	handleAltTextChange(event) {
		const alt = event.target.value

		this.setState({ alt })
	}

	handleWidthTextChange(event) {
		const width = event.target.value

		this.setState({ width })
	}

	handleHeightTextChange(event) {
		const height = event.target.value

		this.setState({ height })
	}

	onCheckSize(event) {
		const size = event.target.value

		this.setState({ size, width: null, height: null })
	}

	focusOnFirstElement() {
		if (this.inputRef && this.inputRef.current) {
			return this.inputRef.current.focus()
		}
	}

	onCloseChooseImageModal(mediaId) {
		const stateChanges = { isChoosingImage: false }

		// Close all modals if no url is specified
		if (!mediaId && !this.state.url) {
			this.props.onConfirm(this.state)
		}

		if (mediaId) {
			stateChanges.url = mediaId
		}

		this.setState(stateChanges)
	}

	onOpenChoosingImageModal() {
		this.setState({ isChoosingImage: true })
	}

	render() {
		if (this.state.isChoosingImage) {
			return (
				<ChooseImageModal
					allowedUploadTypes={this.props.allowedUploadTypes}
					onCloseChooseImageModal={mediaId => this.onCloseChooseImageModal(mediaId)}
				/>
			)
		}

		const size = this.state.size
		return (
			<SimpleDialog
				cancelOk
				title="Image Properties"
				onConfirm={() => this.props.onConfirm(this.state)}
				focusOnFirstElement={this.focusOnFirstElement}
			>
				<div className="image-properties">
					<div>
						<div className="flex-container image-container">
							<Image
								key={this.state.url}
								chunk={{
									modelState: {
										url: this.state.url,
										height: 100,
										size: 'custom',
										alt: 'Image preview'
									}
								}}
							/>

							<Button altAction onClick={this.onOpenChoosingImageModal} ref={this.inputRef}>
								Change Image...
							</Button>
						</div>

						<label htmlFor="obojobo-draft--chunks--figure--alt">Alt Text:</label>
						<input
							type="text"
							id="obojobo-draft--chunks--figure--alt"
							value={this.state.alt || ''}
							onChange={this.handleAltTextChange}
							size="50"
							placeholder="Describe the Image"
						/>

						<label htmlFor="obojobo-draft--chunks--figure--size">Size:</label>
						<div
							id="obojobo-draft--chunks--figure--size"
							role="radiogroup"
							aria-label="Select size for image"
						>
							<div className="size-input">
								<input
									type="radio"
									name="size"
									value="large"
									id="obojobo-draft--chunks--figure--size-large"
									checked={size === 'large'}
									onChange={this.onCheckSize}
								/>
								<label htmlFor="obojobo-draft--chunks--figure--size-large">Large</label>
							</div>
							<div className="size-input">
								<input
									type="radio"
									name="size"
									value="medium"
									id="obojobo-draft--chunks--figure--size-medium"
									checked={size === 'medium'}
									onChange={this.onCheckSize}
								/>
								<label htmlFor="obojobo-draft--chunks--figure--size-medium">Medium</label>
							</div>
							<div className="size-input">
								<input
									type="radio"
									name="size"
									value="small"
									id="obojobo-draft--chunks--figure--size-small"
									checked={size === 'small'}
									onChange={this.onCheckSize}
								/>
								<label htmlFor="obojobo-draft--chunks--figure--size-small">Small</label>
							</div>
							<div className="size-input">
								<input
									type="radio"
									name="size"
									value="custom"
									id="obojobo-draft--chunks--figure--size-custom"
									checked={size === 'custom'}
									onChange={this.onCheckSize}
								/>
								<label htmlFor="obojobo-draft--chunks--figure--size-custom">Custom</label>
								{size === 'custom' ? (
									<div className="custom-size-inputs">
										<input
											id="obojobo-draft--chunks--figure--custom-width"
											name="custom-width"
											min="1"
											max="2000"
											step="1"
											type="number"
											placeholder="Width"
											aria-label="Width in pixels"
											value={this.state.width || ''}
											onChange={this.handleWidthTextChange}
										/>
										<span>px × </span>
										<input
											id="obojobo-draft--chunks--figure--custom-height"
											name="custom-height"
											min="1"
											max="2000"
											step="1"
											type="number"
											placeholder="Height"
											aria-label="Height in pixels"
											value={this.state.height || ''}
											onChange={this.handleHeightTextChange}
										/>
										<span>px</span>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</SimpleDialog>
		)
	}
}

export default ImageProperties
