import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../component/Navbar/Navbar';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import UserContext from '../context/UserContext';

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

					<Route path='/home' element={<HomePage />} />
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
