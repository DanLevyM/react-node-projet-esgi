import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import { userIsAuth } from '../../utils/local-storage';

import c from './Navbar.module.css';

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
		<nav className={c.nav}>
			<ul className={c.ul}>
				<li className={c.li}>
					<Link to={'/home'} className={c.link}>
						Home
					</Link>
				</li>
				{!userIsAuth() ? (
					<>
						<li className={c.li}>
							<Link to={'/login'} className={c.link}>
								Login
							</Link>
						</li>
						<li className={c.li}>
							<Link to={'/register'} className={c.link}>
								Register
							</Link>
						</li>
					</>
				) : (
					<li className={c.li} onClick={() => logoutUser()}>
						<p className={c.link}>Logout</p>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
