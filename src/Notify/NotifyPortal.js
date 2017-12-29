import { render, Component } from 'preact';
// import PropTypes from 'prop-types';
import { StyledNotifyWrapper } from './styles';

/**
 * Notification Portal Component
 */
class NotifyPortal extends Component {
	constructor(props) {
		super(props);
		this.portal = null;
	}
	componentDidMount() {
		let portal =
			this.props.portalId && document.getElementById(this.props.portalId);
		if (!portal) {
			portal = document.createElement('div');
			portal.id = this.props.portalId;
			portal.style.position = 'fixed';
			portal.style[this.props.position] = '10px';
			portal.style.right = '10px';
			portal.style.overflow = 'hidden';
			document.body.appendChild(portal);
		}
		this.portal = portal;
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		if (!this.props.children.length) {
			return;
		}
		render(
			<StyledNotifyWrapper {...this.props}>
				{this.props.children}
			</StyledNotifyWrapper>,
			this.portal
		);
	}
	componentWillUnmount() {
		const element = document.getElementById(this.props.portalId);
		if (element) {
			document.body.removeChild(this.portal);
		}
	}
	render = () => null;
}

export default NotifyPortal;
