import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';
import { FaGithubAlt } from 'react-icons/fa';

import {
	getFriendsReq,
	delFriendReq,
	answerFriendReq,
} from '../../api/relations.api';
import { generateKey } from '../../utils/string';

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
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-5'>
			{!isLoading ? (
				friendsReq.friends.map((el, index) => (
					<div
						key={generateKey('div-friendReq', index)}
						className='card w-25 m-1'
					>
						<div className='card-body'>
							<h3
								key={generateKey('name-friendReq', index)}
								className='card-title'
							>
								{el.firstName} {el.lastName}
							</h3>
							<h5
								key={generateKey('email-friendReq', index)}
								className='card-text'
							>
								{el.email}
							</h5>
							<div className='d-flex'>
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
						</div>
					</div>
				))
			) : (
				<></>
			)}{' '}
		</div>
	);
};

FriendsRequests.propTypes = {
	open: PropTypes.bool,
};

export default FriendsRequests;
