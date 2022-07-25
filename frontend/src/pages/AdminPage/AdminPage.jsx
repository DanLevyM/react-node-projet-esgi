/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import UsersList from '../../component/admin/UsersList';
import 'bootstrap/dist/css/bootstrap.min.css';

const OtherButton = ({ open }) => {
	if (!open) return null;

	return <p>Other Content</p>;
};
const AdminPage = () => {
	const [isUserList, setIsUserList] = useState(false);
	const [isOtherButton, setOtherButton] = useState(false);

	return (
		<div className='container-fluid'>
			<div className='btn-group d-flex justify-content-center'>
				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUserList(true);
						setOtherButton(false);
					}}
				>
					Show users
				</button>
				<button
					className='btn btn-secondary'
					onClick={() => {
						setOtherButton(true);
						setIsUserList(false);
					}}
				>
					Other button
				</button>
			</div>
			<UsersList open={isUserList} />
			<OtherButton open={isOtherButton} />
		</div>
	);
};

export default AdminPage;
