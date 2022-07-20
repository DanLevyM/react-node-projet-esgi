import React from 'react';
import classes from './RegisterPage.module.css';

import { registerUser } from '../../api/security.api';

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
		<form onSubmit={handleRegisterForm} className={classes.h1}>
			<div className='container'>
				<label htmlFor='email'>Email</label>
				<input type='text' placeholder='user@gmail.com' name='email' />
			</div>
			<div className='container'>
				<label htmlFor='password'>Password</label>
				<input type='text' placeholder='Your password' name='password' />
			</div>
			<button type='submit'>Register</button>
		</form>
	);
};

export default LoginPage;
