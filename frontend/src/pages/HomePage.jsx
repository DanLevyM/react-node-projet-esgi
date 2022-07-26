import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getMe } from '../api/users.api';

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [me, setMe] = useState({});
	useEffect(() => {
		let isCancelled = false;

		const retrieveMe = async () => {
			const res = await getMe(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setMe(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveMe();
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	return (
		<div>
			{!isLoading ? (
				<div className='container-fluid'>
					<h1>
						Welcome {me.firstName} {me.lastName} !
					</h1>
					{me.technologies.map((el, index) => (
						<h3 key={index}>{el}</h3>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default HomePage;
