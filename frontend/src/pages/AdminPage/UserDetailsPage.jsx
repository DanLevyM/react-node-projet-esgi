import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../../api/admin.api';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetailsPage = () => {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const nav = useNavigate();

	useEffect(() => {
		let isCancelled = false;

		const retrieveUser = async () => {
			const res = await getUser(localStorage.getItem('token'), id);
			if (!isCancelled) {
				setIsLoading(false);
				setUser(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveUser();
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	const handleFormUpdateUserByAdmin = async (e) => {
		e.preventDefault();
		const body = {
			email: e.target.elements.email.value,
			firstName: e.target.elements.firstName.value,
			lastName: e.target.elements.lastName.value,
		};

		if (e.target.elements.password.value !== '')
			body.password = e.target.elements.password.value;

		const res = await updateUser(localStorage.getItem('token'), id, body);
		nav('/admin');
	};

	const handleDeleteUser = async (e) => {
		await deleteUser(localStorage.getItem('token'), id);
		nav('/admin');
	};

	return (
		<div>
			<h1>Update user</h1>
			<form onSubmit={handleFormUpdateUserByAdmin}>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' name='email' defaultValue={user.email} />
				</div>
				<div>
					<label htmlFor='firstName'>Firstname</label>
					<input type='text' name='firstName' defaultValue={user.firstName} />
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
				onClick={() => handleDeleteUser()}
			>
				Delete user
			</button>
		</div>
	);
};

export default UserDetailsPage;
