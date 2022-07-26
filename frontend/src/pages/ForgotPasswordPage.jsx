import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { forgotPassword } from '../api/users.api';

const ForgotPasswordPage = () => {
	const nav = useNavigate();

	const handleForgotPasswordForm = async (e) => {
		e.preventDefault();

		const postData = {
			email: e.target.elements.email.value,
		};
		console.log(postData);

		const result = await forgotPassword(postData);
		console.log(result);
		if (result.success == true) {
			alert('We sent you an email to create new password. Check your emails.');
			nav('/login');
		} else {
			alert('This email does not exist.');
		}
		return;
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<h1>Sign up</h1>
			</div>
			<form onSubmit={handleForgotPasswordForm} className='pb-3'>
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
				<div className='text-center m-2'>
					<button type='submit' className='btn btn-primary btn-sm w-100'>
						Send password
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordPage;
