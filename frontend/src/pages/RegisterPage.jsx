import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { registerUser } from '../api/security.api';

const LoginPage = () => {
	const handleRegisterForm = async (e) => {
		e.preventDefault();

		const postData = JSON.stringify({
			email: e.target.elements.email.value,
			password: e.target.elements.password.value,
		});

		registerUser(postData);
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<h1>Sign in</h1>
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
						/>
					</div>
				</div>
				<div className='form-group row p-1'>
					<label htmlFor='password' className='col-sm-2 col-form-label'>
						Password
					</label>
					<div className='col-sm-10'>
						<input
							type='text'
							placeholder='Your password'
							name='password'
							className='form-control'
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

export default LoginPage;
