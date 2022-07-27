import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { resetPassword, updatePwdAfterResetToken } from '../api/users.api';

let result;
let success;

const ResetPasswordPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { resettoken } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		let isCancelled = false;

		const retrieveResetToken = async () => {
			result = await resetPassword(resettoken);
			if (!isCancelled) {
				setIsLoading(false);
			}
			return await result.success;
		};

		if (!isCancelled) {
			setIsLoading(true);
			success = retrieveResetToken();
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	setTimeout(() => {
		// console.log('success', success);
		console.log('result', result);
		if (!result.success) {
			nav('/login');
		}
	}, 1 * 1000);

	const handleResetPasswordForm = async (e) => {
		e.preventDefault();

		const user = await updatePwdAfterResetToken(
			result.token,
			e.target.elements.newPwd.value
		);
		nav('/login');
		return;
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<h1>Reset password</h1>
			</div>
			<form onSubmit={handleResetPasswordForm} className='pb-3'>
				<div className='form-group row p-1'>
					<label htmlFor='email' className='col-sm-2 col-form-label'>
						Password
					</label>
					<div className='col-sm-10'>
						<input
							type='password'
							placeholder='Your new password...'
							name='newPwd'
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

export default ResetPasswordPage;
