import React, { useState } from 'react';
import { getUsers } from '../api/users.api';

import 'bootstrap/dist/css/bootstrap.min.css';

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
		<>
			<h1>Homepage</h1>
		</>
		// <div >
		// 	<div >
		// 		<p>m on the right</p>
		// 	</div>
		// 	{/* <button onClick={getUsersList}>Load</button> */}
		// </div>
	);
};

export default HomePage;
