import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ open }) => {
	if (!open) return null;
	return (
		<>
			<h1>My profile</h1>
		</>
	);
};

Profile.propTypes = {
	open: PropTypes.bool,
	children: PropTypes.node,
	onClose: PropTypes.func,
};

export default Profile;
