import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContext from '../context/UserContext';
import { userIsAuth, userRole } from '../utils/local-storage';

const Navbar = () => {
	const { user, authUser } = useContext(UserContext);

	const nav = useNavigate();

	const logoutUser = () => {
		authUser(false);
		localStorage.removeItem('id');
		localStorage.removeItem('isAuth');
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		nav('/login');
	};

	return (
		<nav className='navbar navbar-light bg-light px-3'>
			<Link to={'/'} className='navbar-brand'>
				Home
			</Link>
			<ul className='nav nav-pills'>
				{userRole() === 'admin' || userRole() === 'user' ? (
					<>
						<li className='nav-item'>
							<Link className='nav-link' to={'/relations'}>
								Relations
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to={'/profile'}>
								Profile
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to={'/newPost'}>
								New post
							</Link>
						</li>
					</>
				) : (
					<></>
				)}

				{userRole() === 'admin' ? (
					<li className='nav-item'>
						<Link className='nav-link' to={'/admin'}>
							Dashboard
						</Link>
					</li>
				) : (
					<></>
				)}
				{!userIsAuth() ? (
					<>
						<li className='nav-item'>
							<Link className='nav-link' to={'/login'}>
								Login
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to={'/register'}>
								Register
							</Link>
						</li>
					</>
				) : (
					<li className='nav-item' onClick={() => logoutUser()}>
						<p className='nav-link'>Logout</p>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
