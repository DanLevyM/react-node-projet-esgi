import React, { useState } from 'react';
import { getUsers } from '../api/users.api';
import UsersList from '../component/UsersList';
import Profile from '../component/Profile';
import FriendsList from '../component/FriendsList';
import PendingRequestList from '../component/PendingRequestList';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
	const [isUsersList, setIsUsersList] = useState(true);
	const [isFriendsList, setIsFriendsList] = useState(false);
	const [isMyProfile, setIsMyProfile] = useState(false);
	const [isPendingRequests, setIsPendingRequest] = useState(false);

	// const getUsersList = async () => {
	// 	const token = `Bearer ${localStorage.getItem('token')}`;
	// 	try {
	// 		const res = await getUsers(token);
	// 		console.log(res);
	// 		setUsers(res);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	return (
		<div>
			<div>
				<button
					onClick={() => {
						setIsUsersList(true);
						setIsFriendsList(false);
						setIsMyProfile(false);
						setIsPendingRequest(false);
					}}
				>
					Users list
				</button>

				<button
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(true);
						setIsMyProfile(false);
						setIsPendingRequest(false);
					}}
				>
					Friends list
				</button>

				<button
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(false);
						setIsPendingRequest(true);
						setIsMyProfile(false);
					}}
				>
					Pending requests
				</button>

				<button
					onClick={() => {
						setIsUsersList(false);
						setIsFriendsList(false);
						setIsPendingRequest(false);
						setIsMyProfile(true);
					}}
				>
					My profile
				</button>
			</div>
			<UsersList open={isUsersList} />
			<FriendsList open={isFriendsList} />
			<PendingRequestList open={isPendingRequests} />
			<Profile open={isMyProfile} />
		</div>
	);
};

export default HomePage;
