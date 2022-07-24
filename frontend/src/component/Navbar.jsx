import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
import { userIsAuth, userRole } from '../utils/local-storage';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
	const { user, authUser } = useContext(UserContext);

	const nav = useNavigate();

	const logoutUser = () => {
		authUser(false);
		localStorage.removeItem('isAuth');
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		nav('/login');
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				{userRole() === 'admin' ? (
					<li>
						<Link to={'/admin'}>Dashboard</Link>
					</li>
				) : (
					<></>
				)}
				{!userIsAuth() ? (
					<>
						<li>
							<Link to={'/login'}>Login</Link>
						</li>
						<li>
							<Link to={'/register'}>Register</Link>
						</li>
					</>
				) : (
					<li onClick={() => logoutUser()}>
						<p>Logout</p>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
