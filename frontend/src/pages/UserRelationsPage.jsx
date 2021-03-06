import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import UsersList from '../component/relations/UsersList';
import FriendsList from '../component/relations/FriendsList';
import PendingRequestList from '../component/relations/PendingRequestList';
import FriendsRequests from '../component/relations/FriendsRequests';
import BlockedUsersList from '../component/relations/BlockedUsersList';

const UserRelationsPage = () => {
	const [isUsersList, setIsUsersList] = useState(true);
	const [isFriendsList, setIsFriendsList] = useState(false);
	const [isPendingRequests, setIsPendingRequest] = useState(false);
	const [isFriendsRequest, setIsFriendsRequests] = useState(false);
	const [isBlock, setIsBlock] = useState(false);

	return (
		<div className='container-fluid'>
			<div className='btn-group d-flex justify-content-center'>
				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUsersList(true);
						setIsFriendsList(false);
						setIsFriendsRequests(false);
						setIsBlock(false);
						setIsPendingRequest(false);
					}}
				>
					Users list
				</button>

				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(true);
						setIsFriendsRequests(false);
						setIsBlock(false);
						setIsPendingRequest(false);
					}}
				>
					Friends list
				</button>

				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(false);
						setIsFriendsRequests(false);
						setIsPendingRequest(true);
						setIsBlock(false);
					}}
				>
					Pending requests
				</button>

				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(false);
						setIsPendingRequest(false);
						setIsFriendsRequests(true);
						setIsBlock(false);
					}}
				>
					Friends requests
				</button>

				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(false);
						setIsFriendsRequests(false);
						setIsBlock(true);
						setIsPendingRequest(false);
					}}
				>
					Users blocked list
				</button>
			</div>
			<UsersList open={isUsersList} />
			<FriendsList open={isFriendsList} />
			<FriendsRequests open={isFriendsRequest} />
			<PendingRequestList open={isPendingRequests} />
			<BlockedUsersList open={isBlock} />
		</div>
	);
};

export default UserRelationsPage;
