/* eslint-disable react/prop-types */
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
		<div>
			{!isLoading ? (
				users.map((el, index) => (
					<div
						key={generateKey('div', index)}
						onClick={() => nav(`/admin/user/${el.id}`)}
					>
						<h3 key={generateKey('name', index)}>
							{el.firstName} {el.lastName}
						</h3>
						<h3 key={generateKey('email', index)}>{el.email}</h3>

						{/* <div key={generateKey('fa-cont', index)} ontainer}>
							<AiFillPlusCircle
								key={generateKey('upd', index)}
								color='white'
								size={25}
								tem}
							/>
							<GoTrashcan
								key={generateKey('del', index)}
								color='red'
								size={25}
								tem}
							/>
						</div> */}
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default UsersList;
