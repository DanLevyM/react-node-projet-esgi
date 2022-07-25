import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

import { showBlockUser, unBlockUser } from '../../api/relations.api';
import { generateKey } from '../../utils/string';

const BlockedUsersList = ({ open }) => {
	const [usersBlocked, setUsersBlocked] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isBlockedUsersListUpdt, setIsBlockedUsersListUpdt] = useState(0);

	useEffect(() => {
		let isCancelled = false;

		const retrieveUsers = async () => {
			const res = await showBlockUser(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setUsersBlocked(res.users_blocked);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveUsers();
		}

		return () => {
			isCancelled = true;
		};
	}, [isBlockedUsersListUpdt, open]);

	if (!open) return null;

	const unBlockUserClick = async (id) => {
		await unBlockUser(localStorage.getItem('token'), id);
		setIsBlockedUsersListUpdt(Math.random());
	};

	return (
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-5'>
			{!isLoading ? (
				usersBlocked.map((el, index) => (
					<div key={generateKey('div', index)} className='card w-25 m-1'>
						<div className='card-body'>
							<div className='card-title'>
								<h3 key={generateKey('name', index)}>
									{el.firstName} {el.lastName}
								</h3>
							</div>
							<h5 key={generateKey('email', index)} className='card-text'>
								{el.email}
							</h5>
							<div key={generateKey('fa-cont', index)}>
								<button
									className='btn btn-danger'
									onClick={() => unBlockUserClick(el.id)}
								>
									Unblock
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

BlockedUsersList.propTypes = {
	open: PropTypes.bool,
};

export default BlockedUsersList;
