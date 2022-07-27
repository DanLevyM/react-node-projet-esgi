import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContext from '../context/UserContext';

import { addPost } from '../api/posts.api';

const NewPostPage = () => {
	const { user } = useContext(UserContext);
	const [ isPost, setPost ] = useState(false);


	const nav = useNavigate();

	const handlePostForm = async (e) => {
		e.preventDefault();

		const postData = {
		content: e.target.elements[0].value,
		user_post: user.id,
	}

		const code = await addPost(localStorage.getItem('token'), postData);
		if (parseInt(code) === 201) nav('/');
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<h1>New post</h1>
			</div>
			<form onSubmit={handlePostForm} className='pb-3'>
				<div className='form-group row p-1'>
				</div>
				<div className='form-group row p-1'>
					<label className='col-sm-2 col-form-label'>
						Content
					</label>
					<div className='col-sm-10'>
						<input
							type='text'
							placeholder='Your Content'
							className='form-control'
							required
						/>
					</div>
				</div>
				<div className='text-center m-2'>
					<button type='submit' className='btn btn-primary btn-sm w-100'onClick={() => {
						setPost(false);
					}}>
						Publish
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewPostPage;
