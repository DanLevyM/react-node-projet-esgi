import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './LoginPage.module.css';
import { signInUser } from '../../api/security.api';
import UserContext from '../../context/UserContext.jsx';

const LoginPage = () => {
	const nav = useNavigate();
	const { authUser } = useContext(UserContext);

	const handleLoginForm = async (e) => {
		e.preventDefault();

		const postData = JSON.stringify({
			email: e.target.elements.email.value,
			password: e.target.elements.password.value,
		});

		try {
			const res = await signInUser(postData);
			console.log(res);
			localStorage.setItem('isAuth', true);
			localStorage.setItem('token', res.token);
			authUser(true);
		} catch (e) {
			console.error(e);
		}

		nav('/home');
	};

	return (
		<form className={classes.h1} onSubmit={handleLoginForm}>
			LoginPage
			<div className='container'>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					placeholder='user@gmail.com'
					name='email'
					defaultValue='user1@gmail.com'
				/>
			</div>
			<div className='container'>
				<label htmlFor='password'>Password</label>
				<input type='text' placeholder='Your password' name='password' />
			</div>
			<button type='submit'>Sign In</button>
		</form>
	);
};

export default LoginPage;
