import React, { useState } from 'react';
import { getUsers } from '../../api/users.api';

const HomePage = () => {
	const [users, setUsers] = useState([]);

	const getUsersList = async () => {
		const token = `Bearer ${localStorage.getItem('token')}`;
		try {
			const res = await getUsers(token);
			console.log(res);
			setUsers(res);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<ul>
				{users.map((user) => {
					<li key={user.id}>{user.firstName}</li>;
				})}
			</ul>
			<button onClick={getUsersList}>Load</button>
		</div>
	);
};

export default HomePage;
