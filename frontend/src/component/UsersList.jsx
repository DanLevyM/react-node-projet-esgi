import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { GoTrashcan } from 'react-icons/go';
import { AiFillPlusCircle } from 'react-icons/ai';
import { sendFriendReq, getAllRelations } from '../api/relations.api';
import { getUsers } from '../api/admin.api';
import { generateKey } from '../utils/string';
import UserContext from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersList = ({ open }) => {
	const { user } = useContext(UserContext);
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isListUpdt, setIsListUpdt] = useState(0);
	useEffect(() => {
		let isCancelled = false;

		const retrieveUsers = async () => {
			const res = await getUsers(localStorage.getItem('token'));
			const relations = await getAllRelations(localStorage.getItem('token'));

			const relationToRemove = [];
			relations.forEach((relation) => {
				if (relation.user_low === parseInt(user.id)) {
					relationToRemove.push(relation.user_high);
				} else if (relation.user_high === parseInt(user.id)) {
					relationToRemove.push(relation.user_low);
				}
			});

			const usersToAddToList = [];
			res.forEach((userFromRes) => {
				if (relationToRemove.includes(userFromRes.id)) {
					return;
				} else if (userFromRes.id === parseInt(user.id)) {
					return;
				} else {
					usersToAddToList.push(userFromRes);
				}
			});

			if (!isCancelled) {
				setIsLoading(false);
				setUsers(usersToAddToList);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveUsers();
		}

		return () => {
			isCancelled = true;
		};
	}, [isListUpdt]);

	if (!open) return null;

	const sendFriendRequest = async (id) => {
		sendFriendReq(localStorage.getItem('token'), id);
		setIsListUpdt(Math.random());
	};

	return (
		<div>
			{!isLoading ? (
				users.map((el, index) => (
					<div
						key={generateKey('div', index)}
						// onClick={() => nav(`/admin/user/${el.id}`)}
					>
						<h3 key={generateKey('name', index)}>
							{el.firstName} {el.lastName}
						</h3>
						<h3 key={generateKey('email', index)}>{el.email}</h3>
						<div key={generateKey('fa-cont', index)}>
							<AiFillPlusCircle
								key={generateKey('upd', index)}
								color='blue'
								size={25}
								onClick={() => sendFriendRequest(el.id)}
							/>
							<GoTrashcan
								key={generateKey('del', index)}
								color='red'
								size={25}
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

UsersList.propTypes = {
	open: PropTypes.bool,
};

export default UsersList;
