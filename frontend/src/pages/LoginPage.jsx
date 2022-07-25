import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { GoOrganization } from 'react-icons/go';

import { signInUser } from '../api/security.api';
import UserContext from '../context/UserContext.jsx';

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
			if (res.code === 200) {
				localStorage.setItem('id', res.id);
				localStorage.setItem('isAuth', true);
				localStorage.setItem('token', res.token);
				localStorage.setItem('role', res.role);
				authUser(res.id, true, res.role);
			} else {
				console.error('Sign in failed !');
			}
		} catch (e) {
			console.error(e);
		}

		nav('/');
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<div className='pb-2 pt-2'>
				<GoOrganization size={32} />
				<h1>Ça se passe maintenant</h1>
				<h2>Rejoignez nous dès aujourd&#39;hui</h2>
			</div>
			<form onSubmit={handleLoginForm} className='pb-3'>
				<div className='form-group row p-1'>
					<label htmlFor='email' className='col-sm-2 col-form-label'>
						Email
					</label>
					<div className='col-sm-10'>
						<input
							type='text'
							placeholder='user@gmail.com'
							name='email'
							defaultValue='admin@gmail.com'
							className='form-control'
						/>
					</div>{' '}
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
						/>
					</div>
				</div>
				<div className='text-center m-2'>
					<button type='submit' className='btn btn-primary btn-sm w-100'>
						Sign In
					</button>
				</div>
				<div className='text-center m-2'>
					<p
						type=''
						className='btn btn-primary btn-sm w-100'
						onClick={() => nav('/register')}
					>
						Sign up
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
