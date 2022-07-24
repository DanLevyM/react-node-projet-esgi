/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GoTrashcan } from 'react-icons/go';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalDeleteUser from '../../component/ModalDeleteUser/ModalDeleteUser';
import { getUsers } from '../../api/admin.api';

import c from './UsersList.module.css';
const UsersList = ({ open }) => {
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);

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

	const showUsers = () => {
		console.log(users[0]);
	};

	const generateKey = (str, index) => {
		return `${str}-${index}`;
	};

	return (
		<div className={c.cardContainer}>
			{!isLoading ? (
				users[0].map((el, index) => (
					<div key={generateKey('div', index)} className={c.card}>
						<h3 key={generateKey('name', index)} className={c.h3}>
							{el.firstName} {el.lastName}
						</h3>
						<h3 key={generateKey('email', index)} className={c.h3}>
							{el.email}
						</h3>
						<div key={generateKey('fa-cont', index)} className={c.faContainer}>
							<AiFillPlusCircle
								key={generateKey('upd', index)}
								color='white'
								size={25}
								className={c.faItem}
							/>
							<GoTrashcan
								key={generateKey('del', index)}
								color='red'
								size={25}
								className={c.faItem}
							/>
						</div>
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default UsersList;
