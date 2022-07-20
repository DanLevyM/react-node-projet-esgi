import React from 'react';
import classes from './LoginPage.module.css';

const LoginPage = () => {
	return (
		<form className={classes.h1}>
			LoginPage
			<div className='container'>
				<label htmlFor='email'>Email</label>
				<input type='text' placeholder='user@gmail.com' />
			</div>
			<div className='container'>
				<label htmlFor='password'>Password</label>
				<input type='text' placeholder='Your password' />
			</div>
		</form>
	);
};

export default LoginPage;
