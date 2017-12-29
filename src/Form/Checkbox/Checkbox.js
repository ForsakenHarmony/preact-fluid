import React, { Component } from 'preact';
import PropTypes from 'prop-types';
import Grid from '../../Layout/Grid';
import Cell from '../../Layout/Cell';
import { StyledCheckbox, StyledLabel } from './styles';

/**
 * A checkbox is used to verify which options you want selected.
 *
 * @example ./../../../docs/components/Form/Checkbox.md
 */
class Checkbox extends Component {
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

		/**
		 * Gets called when the user clicks on the button
		 *
		 * @param {SyntheticEvent} event The react `SyntheticEvent`
		 */
		onClick: PropTypes.func,
	};

	static defaultProps = {
		checked: false,
		disabled: false,
		grid: {
			columns: '36px 2fr',
			gap: '15px',
		},
		cell: {
			middle: true,
		},
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

	handleOptionChange = input => {
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(input);
		}
	};

	render() {
		const { style = '', checked, className, cell, grid } = this.props;
		const { theme } = this.context;

		return (
			<Grid {...grid} alignContent="space-around">
				<Cell {...cell}>
					<StyledCheckbox
						style={style}
						onClick={this.handleOptionChange}
						className={className}
						theme={theme}
						{...this.props}
					>
						<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
							<symbol id="checkmark" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-miterlimit="10"
									fill="none"
									d="M22.9 3.7l-15.2 16.6-6.6-7.1"
								/>
							</symbol>
						</svg>
						<input type="checkbox" class="checkbox" checked={checked} />
						<label>
							<svg>
								<use xlinkHref="#checkmark" />
							</svg>
						</label>
					</StyledCheckbox>
				</Cell>
				{this.label}
			</Grid>
		);
	}
}

export default Checkbox;
