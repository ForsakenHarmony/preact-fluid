import React, { Component } from 'preact';
import PropTypes from 'prop-types';
import Grid from '../../Layout/Grid';
import Cell from '../../Layout/Cell';
import { StyledRadio, StyledLabel } from './styles';

/**
 * Radio are switches used for selection
 *
 * @example ./../../../docs/components/Form/Radio.md
 */
class Radio extends Component {
	static propTypes = {
		/**
		 * Custom styles
		 */
		style: PropTypes.string,

		/**
		 * onChange
		 */
		onChange: PropTypes.func,

		grid: PropTypes.object,

		cell: PropTypes.object,

		effect: PropTypes.oneOf(['default', 'circle', 'drop']),

		bgColor: PropTypes.string,

		highlightColor: PropTypes.string,
	};

	static defaultProps = {
		grid: {
			columns: '36px 2fr',
			gap: '15px',
		},
		cell: {
			middle: true,
		},
		effect: 'default',
		checked: false,
	};

	static contextTypes = {
		theme: PropTypes.object,
	};

	get label() {
		const { label = '', hideLabel = false, cell = {} } = this.props;

		if (hideLabel) {
			return '';
		}

		return (
			<Cell {...cell}>
				<StyledLabel for={label}>{label}</StyledLabel>
			</Cell>
		);
	}

	handleOptionChange = () => {
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(this.radioBtn);
		}
	};

	render() {
		const {
			style = {},
			className,
			value = '',
			grid,
			cell,
			effect,
			checked,
		} = this.props;
		const { theme } = this.context;

		return (
			<Grid {...grid} alignContent="space-around">
				<Cell {...cell}>
					<StyledRadio
						className={className}
						onClick={this.handleOptionChange}
						{...this.props}
					>
						<input
							className={`radio ${effect}`}
							style={style}
							type="radio"
							value={value}
							checked={checked}
							theme={theme}
							ref={input => {
								this.radioBtn = input;
							}}
						/>
						<label />
					</StyledRadio>
				</Cell>
				{this.label}
			</Grid>
		);
	}
}

export default Radio;
