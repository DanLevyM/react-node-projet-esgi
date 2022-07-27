import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';

import UserContext from '../../context/UserContext';
import { getFriends, deleteFriend } from '../../api/relations.api';
import { generateKey } from '../../utils/string';

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
	}, [friendListUpdated, open]);

	if (!open) return null;

	const removeFriendClick = async (id) => {
		const res = await deleteFriend(localStorage.getItem('token'), id);
		setFriendListUpdated(Math.random());
	};

	return (
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-5'>
			{!isLoading ? (
				friends.friends.map((el, index) => (
					<div key={generateKey('div', index)} className='card w-25 m-1'>
						<div className='card-body'>
							<h3 key={generateKey('name', index)} className='card-title'>
								{el.firstName} {el.lastName}
							</h3>
							<h5 key={generateKey('email', index)} className='card-text'>
								{el.email}
							</h5>
							<GoTrashcan
								key={generateKey('del', index)}
								color='red'
								size={25}
								onClick={() => removeFriendClick(el.id)}
							/>
						</div>
					</div>
				))
			) : (
				<></>
			)}{' '}
		</div>
	);
};

FriendsList.propTypes = {
	open: PropTypes.bool,
};

export default FriendsList;
