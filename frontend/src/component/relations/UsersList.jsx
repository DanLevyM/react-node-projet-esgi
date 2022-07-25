import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { GoTrashcan } from 'react-icons/go';
import { AiFillPlusCircle } from 'react-icons/ai';
import {
	sendFriendReq,
	getAllRelations,
	blockUser,
} from '../../api/relations.api';
import { getUsers } from '../../api/admin.api';
import { generateKey } from '../../utils/string';
import UserContext from '../../context/UserContext';
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
	}, [isListUpdt, open]);

	if (!open) return null;

	const sendFriendRequest = async (id) => {
		await sendFriendReq(localStorage.getItem('token'), id);
		setIsListUpdt(Math.random());
	};

	const blockUserClick = async (id) => {
		const res = await blockUser(localStorage.getItem('token'), id);
		console.log(id, res);
		setIsListUpdt(Math.random());
	};

	return (
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-5'>
			{!isLoading ? (
				users.map((el, index) => (
					<div key={generateKey('div', index)} className='card w-25 m-1'>
						<div className='card-body'>
							<div className='card-title'>
								<h3 key={generateKey('name', index)}>
									{el.firstName} {el.lastName}
								</h3>
							</div>
							<div className='card-text'>
								<h5 key={generateKey('email', index)}>{el.email}</h5>
							</div>
							<div key={generateKey('fa-cont', index)} className='d-flex'>
								<AiFillPlusCircle
									color='blue'
									size={25}
									key={generateKey('upd', index)}
									onClick={() => sendFriendRequest(el.id)}
								/>
								<GoTrashcan
									color='red'
									size={25}
									key={generateKey('del', index)}
									onClick={() => blockUserClick(el.id)}
								/>
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

UsersList.propTypes = {
	open: PropTypes.bool,
};

export default UsersList;
