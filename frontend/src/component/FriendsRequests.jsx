import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';
import { FaGithubAlt } from 'react-icons/fa';

import {
	getFriendsReq,
	delFriendReq,
	answerFriendReq,
} from '../api/relations.api';
import { generateKey } from '../utils/string';

const FriendsRequests = ({ open }) => {
	const [friendsReq, setFriendsReq] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [friendsReqListUpdated, setFriendsReqListUpdated] = useState(1);

	useEffect(() => {
		let isCancelled = false;

		const retrieveFriendsReq = async () => {
			const res = await getFriendsReq(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setFriendsReq(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveFriendsReq();
		}

		return () => {
			isCancelled = true;
		};
	}, [friendsReqListUpdated, open]);

	if (!open) return null;

	const removeFriendsReqClick = async (id) => {
		await delFriendReq(localStorage.getItem('token'), id);
		setFriendsReqListUpdated(Math.random());
	};

	const acceptFriendsReqClick = async (id_receiver) => {
		const res = await answerFriendReq(
			localStorage.getItem('token'),
			id_receiver,
			'accept'
		);
		setFriendsReqListUpdated(Math.random());
	};

	return (
		<>
			<h1>FRIENDS REQUESTS</h1>
			{!isLoading ? (
				friendsReq.friends.map((el, index) => (
					<div key={generateKey('div-friendReq', index)}>
						<h3 key={generateKey('name-friendReq', index)}>
							{el.firstName} {el.lastName}
						</h3>
						<h3 key={generateKey('email-friendReq', index)}>{el.email}</h3>
						<FaGithubAlt
							key={generateKey('accept-friendReq', index)}
							color='green'
							size={25}
							onClick={() => acceptFriendsReqClick(el.id)}
						/>
						<GoTrashcan
							key={generateKey('del-friendReq', index)}
							color='red'
							size={25}
							onClick={() => removeFriendsReqClick(el.id)}
						/>
					</div>
				))
			) : (
				<></>
			)}{' '}
		</>
	);
};

FriendsRequests.propTypes = {
	open: PropTypes.bool,
};

export default FriendsRequests;
