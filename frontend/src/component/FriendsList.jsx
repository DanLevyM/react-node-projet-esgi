import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '..//context/UserContext';
import { GoTrashcan } from 'react-icons/go';

import { getFriends, deleteFriend } from '../api/relations.api';
import { generateKey } from '../utils/string';

const FriendsList = ({ open }) => {
	const [friends, setFriends] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [friendListUpdated, setFriendListUpdated] = useState(1);
	const { user } = useContext(UserContext);

	useEffect(() => {
		let isCancelled = false;

		const retrieveFriends = async () => {
			const res = await getFriends(localStorage.getItem('token'), user.id);
			if (!isCancelled) {
				setIsLoading(false);
				setFriends(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveFriends();
		}

		return () => {
			isCancelled = true;
		};
	}, [friendListUpdated]);

	if (!open) return null;

	const removeFriendClick = async (id) => {
		const res = await deleteFriend(localStorage.getItem('token'), id);
		setFriendListUpdated(Math.random());
	};

	return (
		<>
			{!isLoading ? (
				friends.friends.map((el, index) => (
					<div key={generateKey('div', index)}>
						<h3 key={generateKey('name', index)}>
							{el.firstName} {el.lastName}
						</h3>
						<h3 key={generateKey('email', index)}>{el.email}</h3>
						<GoTrashcan
							key={generateKey('del', index)}
							color='red'
							size={25}
							onClick={() => removeFriendClick(el.id)}
						/>
					</div>
				))
			) : (
				<></>
			)}{' '}
		</>
	);
};

FriendsList.propTypes = {
	open: PropTypes.bool,
};

export default FriendsList;
