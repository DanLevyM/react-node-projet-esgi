import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';

import { getPendingReq, delFriendReq } from '../../api/relations.api';
import { generateKey } from '../../utils/string';

const PendingRequestList = ({ open }) => {
	const [pendingReq, setPendingReq] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [friendReqListUpdated, setFriendReqListUpdated] = useState(1);

	useEffect(() => {
		let isCancelled = false;

		const retrievePendingReq = async () => {
			const res = await getPendingReq(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setPendingReq(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrievePendingReq();
		}

		return () => {
			isCancelled = true;
		};
	}, [friendReqListUpdated, open]);

	if (!open) return null;

	const removePendingReqClick = async (id) => {
		await delFriendReq(localStorage.getItem('token'), id);
		setFriendReqListUpdated(Math.random());
	};

	return (
		<div className='d-flex align-content-start justify-content-around flex-wrap w-100 mt-5'>
			{!isLoading ? (
				pendingReq.friends.map((el, index) => (
					<div key={generateKey('div-pend', index)} className='card w-25 m-1'>
						<div className='card-body'>
							<h3 key={generateKey('name-pend', index)} className='card-title'>
								{el.firstName} {el.lastName}
							</h3>
							<h5 key={generateKey('email-pend', index)} className='card-text'>
								{el.email}
							</h5>
							<GoTrashcan
								key={generateKey('del-pend', index)}
								color='red'
								size={25}
								onClick={() => removePendingReqClick(el.id)}
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

PendingRequestList.propTypes = {
	open: PropTypes.bool,
};

export default PendingRequestList;
