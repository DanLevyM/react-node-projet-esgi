import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUsers } from '../../api/admin.api';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersList = ({ open }) => {
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		let isCancelled = false;

		const retrieveUsers = async () => {
			const res = await getUsers(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setUsers(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveUsers();
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	if (!open) return null;

	const generateKey = (str, index) => {
		return `${str}-${index}`;
	};

	return (
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-3'>
			{!isLoading ? (
				users.map((el, index) => (
					<div key={generateKey('div', index)} className='card w-25 m-1'>
						<div className='card-body'>
							<div
								key={generateKey('div', index)}
								onClick={() => nav(`/admin/user/${el.id}`)}
							>
								<h3 key={generateKey('name', index)} className='card-title'>
									{el.firstName} {el.lastName}
								</h3>
								<h5 key={generateKey('email', index)} className='card-text'>
									{el.email}
								</h5>
							</div>
						</div>{' '}
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

UsersList.propTypes = {
	open: PropTypes.bool,
};

export default UsersList;
