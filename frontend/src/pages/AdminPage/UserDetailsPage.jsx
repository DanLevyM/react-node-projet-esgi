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
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<form onSubmit={handleFormUpdateUserByAdmin}>
				<div className='form-group row p-1'>
					<label htmlFor='email' className='col-sm-2 col-form-label'>
						Email
					</label>
					<div className='col-sm-10'>
						<input
							className='form-control'
							type='text'
							name='email'
							defaultValue={user.email}
						/>
					</div>
				</div>
				<div className='form-group row p-1'>
					<label htmlFor='firstName' className='col-sm-2 col-form-label'>
						Firstname
					</label>
					<div className='col-sm-10'>
						<input
							className='form-control'
							type='text'
							name='firstName'
							defaultValue={user.firstName}
						/>
					</div>
				</div>
				<div className='form-group row p-1'>
					<label htmlFor='lastName' className='col-sm-2 col-form-label'>
						Lastname
					</label>
					<div className='col-sm-10'>
						<input
							className='form-control'
							type='text'
							name='lastName'
							defaultValue={user.lastName}
						/>
					</div>
				</div>
				<div className='form-group row p-1'>
					<label htmlFor='password' className='col-sm-2 col-form-label'>
						Password
					</label>
					<div className='col-sm-10'>
						<input
							className='form-control'
							type='password'
							name='password'
							autoComplete='true'
						/>
					</div>
				</div>
				<div className='text-center m-2'>
					<button type='submit' className='btn btn-primary btn-lg w-100'>
						Update user
					</button>
				</div>
			</form>
			<div className='text-center m-2'>
				<button
					className='btn btn-danger btn-lg w-100'
					onClick={() => handleDeleteUser()}
				>
					Delete user
				</button>
			</div>
		</div>
	);
};

export default UserDetailsPage;
