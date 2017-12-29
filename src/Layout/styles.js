import styled, { css } from 'styled-components';

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`;

const columns = ({ columns = 12 }) =>
	typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;

const gap = ({ gap = '8px' }) => `${gap} ${gap}`;

const flow = ({ flow = 'row' }) => flow;

const formatAreas = areas => areas.map(area => `"${area}"`).join(' ');

const StyledGrid = styled.div`
	display: grid;
	grid-auto-flow: ${flow};
	grid-auto-rows: ${autoRows};
	${({ rows }) => rows && `grid-template-rows: ${rows}`};
	grid-template-columns: ${columns};
	grid-gap: ${gap};
	${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
	${({ justifyContent }) =>
		justifyContent && `justify-content: ${justifyContent}`};
	${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
	${({ alignItems }) =>
		alignItems &&
		css`
			align-items: ${alignItems};
			-webkit-box-align: ${alignItems};
			-ms-flex-align: ${alignItems};
		`};
	${({ style }) =>
		style &&
		css`
			${style};
		`};
`;

const StyledCell = styled.section`
	height: 100%;
	min-width: 0;
	overflow: hidden;
	align-content: space-around;
	grid-column-end: ${({ width = 1 }) => `span ${width}`};
	grid-row-end: ${({ height = 1 }) => `span ${height}`};
	${({ left }) => left && `grid-column-start: ${left}`};
	${({ top }) => top && `grid-row-start: ${top}`};
	${({ center }) => center && `text-align: center`};
	${({ area }) => area && `grid-area: ${area}`};
	${({ middle }) =>
		middle &&
		css`
			display: inline-flex;
			flex-flow: column wrap;
			justify-content: center;
			justify-self: stretch;
		`};

	${({ overflow }) =>
		overflow &&
		css`
			overflow: visible;
		`};

	${({ style }) =>
		style &&
		css`
			${style};
		`};
`;

export { StyledGrid, StyledCell };
