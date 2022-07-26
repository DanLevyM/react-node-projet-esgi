import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getMe } from '../api/users.api';
import { getPosts } from '../api/posts.api';

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [me, setMe] = useState({});
	const [posts, getPosts] = useState({});

	useEffect(() => {
		let isCancelled = false;

		const retrieveMe = async () => {
			const res = await getMe(localStorage.getItem('token'));
			const resPosts = await getPosts(localStorage.getItem('token'));

			if (!isCancelled) {
				setIsLoading(false);
				setMe(res);
				getPosts(resPosts);
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
			<h1>
				Welcome {me.firstName} {me.lastName} !
			</h1>
			{!isLoading ? (
					posts.posts.map((post) => (
						<div key={generateKey()} >ntm</div>
						
					)
					
				
			)) : (
				<></>
			)}
		</div>
	);
};

export default HomePage;
