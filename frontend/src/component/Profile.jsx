import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import PropTypes from 'prop-types';
import { getMe, updateMe, deleteMe } from '../api/users.api';

const Profile = () => {
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
	};

	const handleDeleteMe = async (e) => {
		const res = await deleteMe(localStorage.getItem('token'));
		if (res) {
			authUser(user.id, false, 'user');
			localStorage.removeItem('id');
			localStorage.removeItem('isAuth');
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			setInterval(() => {
				nav('/login');
			}, 2000);
		}
	};

	return (
		<div>
			<h1>Update Me</h1>
			{!isLoading ? (
				<>
					<form onSubmit={handleFormUpdateUser}>
						<div>
							<label htmlFor='email'>Email</label>
							<input type='text' name='email' defaultValue={user.email} />
						</div>
						<div>
							<label htmlFor='firstName'>Firstname</label>
							<input
								type='text'
								name='firstName'
								defaultValue={user.firstName}
							/>
						</div>
						<div>
							<label htmlFor='lastName'>Lastname</label>
							<input type='text' name='lastName' defaultValue={user.lastName} />
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input type='password' name='password' autoComplete='true' />
						</div>
						<button type='submit' className='btn btn-primary btn-lg'>
							Update user
						</button>
					</form>
					<button
						className='btn btn-danger btn-lg'
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

Profile.propTypes = {};

export default Profile;
