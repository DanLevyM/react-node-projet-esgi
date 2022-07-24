import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../component/admin/Navbar';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';

import UserContext from '../context/UserContext';
import UserDetailsPage from '../pages/AdminPage/UserDetailsPage';

const OnlyWhen = ({ condition, otherwise, children }) => {
	return condition ? children : <Navigate to={otherwise} />;
};

export default function MyRouter() {
	const { user } = useContext(UserContext);

	return (
		<>
			<BrowserRouter>
				{user.isAuth ? <Navbar /> : <></>}
				<Routes>
					<Route
						path='/register'
						element={
							<OnlyWhen condition={!user.isAuth} otherwise='/home'>
								<RegisterPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/login'
						element={
							<OnlyWhen condition={!user.isAuth} otherwise='/home'>
								<LoginPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/admin/user/:id'
						element={
							<OnlyWhen
								condition={user.isAuth && user.role === 'admin'}
								otherwise='/home'
							>
								<UserDetailsPage />
							</OnlyWhen>
						}
					/>
					<Route
						path='/admin'
						element={
							<OnlyWhen
								condition={user.isAuth && user.role === 'admin'}
								otherwise='/home'
							>
								<AdminPage />
							</OnlyWhen>
						}
					/>

					<Route path='/home' element={<LoginPage />} />
					{/* <Route path='*' element={<NotFound />}/> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

OnlyWhen.propTypes = {
	condition: PropTypes.bool,
	otherwise: PropTypes.string,
	children: PropTypes.node,
};
