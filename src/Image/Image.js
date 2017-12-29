import React, { Component } from 'preact';
import PropTypes from 'prop-types';
import { StyledImageWrapper, StyledImage } from './styles';

/**
 * Progressive Image Loading with a blur effect option to reduce the page load time
 *
 * @example ./../../docs/components/Image.md
 */
class Image extends Component {
	static propTypes = {
		/**
		 * Custom styles
		 */
		style: PropTypes.string,

		/**
		 * Gets called when the user clicks on the button
		 *
		 * @param {SyntheticEvent} event The react `SyntheticEvent`
		 */
		onClick: PropTypes.func,
	};
	handleImageLoaded = () => {
		this.setState({
			placeholderHeight: 0,
			placeholderWidth: 0,
			imageLoaded: true,
		});
	};
	handleImageErrored = () => {
		// TODO - Should re-fetch the image
	};
	placeholderOnLoad = element => {
		if (!this.state.imageLoaded) {
			this.setState({
				placeholderHeight: element.target.offsetHeight,
				placeholderWidth: element.target.offsetWidth,
			});
		}
	};
	renderResponsiveImages = (images = []) =>
		images.map(image => <source srcset={image.src} media={image.media} />);
	renderPlaceholder = placeholder => {
		if (placeholder) {
			return (
				<StyledImage
					src={placeholder}
					style={`
				position:absolute;
				top: 0;
				left: 0;
				opacity: ${this.state.imageLoaded ? '0' : '1'};
				filter: blur(5px);
				transform: scale(1);
				transition: opacity 1s linear;
			`}
					handleImageLoaded={this.placeholderOnLoad}
				/>
			);
		}
		return '';
	};
	render() {
		const { responsive, placeholder = '', className, inline } = this.props;
		const { placeholderHeight = 0, placeholderWidth = 0 } = this.state;
		return (
			<StyledImageWrapper inline={inline} className={className}>
				<div
					style={{
						height: placeholderHeight + 'px',
						width: placeholderWidth + 'px',
					}}
				/>
				<picture>
					{this.renderResponsiveImages(responsive)}
					<StyledImage
						{...this.props}
						handleImageLoaded={this.handleImageLoaded}
						handleImageErrored={this.handleImageErrored}
					/>
				</picture>
				{this.renderPlaceholder(placeholder)}
			</StyledImageWrapper>
		);
	}
}

export default Image;
