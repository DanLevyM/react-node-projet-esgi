import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import { userIsAuth } from '../../utils/local-storage';

const Navbar = () => {
	const { user, authUser } = useContext(UserContext);

	const nav = useNavigate();

	const logoutUser = () => {
		authUser(false);
		localStorage.removeItem('isAuth');
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		nav('/home');
	};

	return (
		<nav id='navbar-container'>
			<Link to={'/home'}>Home</Link>
			{!userIsAuth() ? (
				<>
					<Link to={'/login'}>Login</Link>
					<Link to={'/register'}>Register</Link>
				</>
			) : (
				<button onClick={() => logoutUser()}>Logout</button>
			)}
		</nav>
	);
};

export default Navbar;
