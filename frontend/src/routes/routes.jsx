import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../component/admin/Navbar';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

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
							<OnlyWhen condition={!user.isAuth} otherwise='/'>
								<RegisterPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/login'
						element={
							<OnlyWhen condition={!user.isAuth} otherwise='/'>
								<LoginPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/'
						element={
							<OnlyWhen condition={user.isAuth} otherwise='/login'>
								<LoginPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/admin/user/:id'
						element={
							<OnlyWhen
								condition={user.isAuth && user.role === 'admin'}
								otherwise='/login'
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
								otherwise='/login'
							>
								<AdminPage />
							</OnlyWhen>
						}
					/>

					<Route path='*' element={<NotFoundPage />} />
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
