import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContext from '../context/UserContext';

import { post } from '../api/posts.api';

const NewPostPage = () => {
	const { user, authUser } = useContext(UserContext);
	const nav = useNavigate();

	console.log(user.id)

	const handleRegisterForm = async (e) => {
		e.preventDefault();

		const postData = JSON.stringify({
			user_id: e.target.elements.email.value,
			content: e.target.elements.password.value,
		});

		const code = await registerUser(postData);
		if (parseInt(code) === 201) nav('/newPost');
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<h1>New post</h1>
			</div>
			<form onSubmit={handleRegisterForm} className='pb-3'>
				<div className='form-group row p-1'>
					<label htmlFor='email' className='col-sm-2 col-form-label'>
						Email
					</label>
					<div className='col-sm-10'>
						<input
							type='text'
							placeholder='user@gmail.com'
							name='email'
							className='form-control'
							required
						/>
					</div>
				</div>
				<div className='form-group row p-1'>
					<label htmlFor='password' className='col-sm-2 col-form-label'>
						Password
					</label>
					<div className='col-sm-10'>
						<input
							type='password'
							placeholder='Your password'
							name='password'
							className='form-control'
							autoComplete='true'
							required
						/>
					</div>
				</div>
				<div className='text-center m-2'>
					<button type='submit' className='btn btn-primary btn-sm w-100'>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewPostPage;
