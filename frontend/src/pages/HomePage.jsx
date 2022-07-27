import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getMe } from '../api/users.api';
import { getPosts } from '../api/posts.api';
import Post from '../component/Post';


const HomePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [me, setMe] = useState({});
	const [posts, setPosts] = useState({});

	useEffect(() => {
		let isCancelled = false;

		const retrieveMe = async () => {
			const res = await getMe(localStorage.getItem('token'));
			const resPosts = await getPosts(localStorage.getItem('token'));

			if (!isCancelled) {
				setIsLoading(false);
				setMe(res);
				setPosts(await resPosts);
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
		<div className='container-fluid'>
			<h1>
				Welcome {me.firstName} {me.lastName} !
			</h1>
			{!isLoading ? posts.map((el, index) => <Post el={el} index={index} key={index}/>) : <></>}
		</div>
	);
};

export default HomePage;
