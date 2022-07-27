import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getMe, updateMe, deleteMe } from '../api/users.api';

const Profile = ({ open }) => {
	if (!open) return null;

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { authUser } = useContext(UserContext);
	const nav = useNavigate();

	useEffect(() => {
		let isCancelled = false;

		const retrieveMe = async () => {
			const res = await getMe(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setUser(res);
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

	const handleFormUpdateUser = async (e) => {
		e.preventDefault();
		const body = {
			email: e.target.elements.email.value,
			firstName: e.target.elements.firstName.value,
			lastName: e.target.elements.lastName.value,
		};

		if (e.target.elements.password.value !== '')
			body.password = e.target.elements.password.value;

		await updateMe(localStorage.getItem('token'), body);
		nav('/');
	};

	const handleDeleteMe = async (e) => {
		const res = await deleteMe(localStorage.getItem('token'));
		if (res) {
			authUser(user.id, false, 'user');
			localStorage.removeItem('id');
			localStorage.removeItem('isAuth');
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			nav('/login');
		}
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<h1>Update Me</h1>
			{!isLoading ? (
				<>
					<form onSubmit={handleFormUpdateUser}>
						<div className='form-group row p-1'>
							<label htmlFor='email' className='col-sm-2 col-form-label'>
								Email
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									name='email'
									defaultValue={user.email}
									className='form-control'
								/>
							</div>
						</div>
						<div className='form-group row p-1'>
							<label htmlFor='firstName' className='col-sm-2 col-form-label'>
								Firstname
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									name='firstName'
									defaultValue={user.firstName}
									className='form-control'
								/>
							</div>
						</div>
						<div className='form-group row p-1'>
							<label htmlFor='lastName' className='col-sm-2 col-form-label'>
								Lastname
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									name='lastName'
									defaultValue={user.lastName}
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
									name='password'
									autoComplete='true'
									className='form-control'
								/>
							</div>{' '}
						</div>
						<button type='submit' className='btn btn-primary btn-lg w-100 m-1'>
							Update my infos
						</button>
					</form>
					<button
						className='btn btn-danger btn-lg w-100 m-1'
						onClick={() => handleDeleteMe()}
					>
						Delete user
					</button>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

Profile.propTypes = {
	open: PropTypes.bool,
};

export default Profile;
