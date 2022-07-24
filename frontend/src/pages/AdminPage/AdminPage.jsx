/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { AiFillPlusCircle } from 'react-icons/ai';
import c from './AdminPage.module.css';
import { getUsers } from '../../api/admin.api';
import UsersList from '../../component/admin/UsersList';

const OtherButton = ({ open }) => {
	if (!open) return null;

	return <p>Other Content</p>;
};
const AdminPage = () => {
	const [isUserList, setIsUserList] = useState(false);
	const [isOtherButton, setOtherButton] = useState(false);

	return (
		<div className={c.container}>
			<div className={c.btnContainer}>
				<button
					className={c.button}
					onClick={() => {
						setIsUserList(true);
						setOtherButton(false);
					}}
				>
					Show users
				</button>
				<button
					className={c.button}
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
