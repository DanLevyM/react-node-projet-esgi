import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getMe } from '../api/users.api';
import { getPosts } from '../api/posts.api';

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

	const generateKey = (str, index) => {
		return `${str}-${index}`;
	};

	return (
		<div className='container-fluid'>
			<h1>
				Welcome {me.firstName} {me.lastName} !
			</h1>
      <p>{me.technologies.map((el, index) => (
						<h3 key={index}>{el}</p>
			{!isLoading ? (
				posts.map((el, index) => (
					<div
						key={generateKey('div', index)}
						className='d-flex flex-column text-wrap p-3 m-2 border shadow rounded bg-info w-75 mx-auto'
					>
						<h5 className=''>{el.user_name}</h5>
						<p key={generateKey('text', index)} className=''>
							{el.content}
						</p>
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default HomePage;
