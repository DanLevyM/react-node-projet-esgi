import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: 'red',
	padding: '50px',
	zIndex: 1000,
};

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	botton: 0,
	backgroundColor: 'green',
	zIndex: 1000,
};

const ModalDeleteUser = ({ open, children, onClose }) => {
	if (!open) return null;

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES}>
				<div style={MODAL_STYLES}>
					<button onClick={onClose}>Close modal</button>
					{children}
				</div>
			</div>
		</>,
		document.getElementById('portal')
	);
};

ModalDeleteUser.propTypes = {
	open: PropTypes.bool,
	children: PropTypes.node,
	onClose: PropTypes.func,
};

export default ModalDeleteUser;
