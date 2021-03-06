import React, { useContext } from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	useParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import UserContext from '../context/UserContext';
import Navbar from '../component/Navbar';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import UserRelationsPage from '../pages/UserRelationsPage';
import ProfilePage from '../pages/ProfilePage';
import UserDetailsPage from '../pages/AdminPage/UserDetailsPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import NewPostPage from '../pages/NewPostPage';

const OnlyWhen = ({ condition, otherwise, children }) => {
	return condition ? children : <Navigate to={otherwise} />;
};

export default function MyRouter() {
	const { user } = useContext(UserContext);
	let { resettoken } = useParams();

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
								<HomePage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/relations'
						element={
							<OnlyWhen condition={user.isAuth} otherwise='/login'>
								<UserRelationsPage />
							</OnlyWhen>
						}
					/>

					<Route
						path='/profile'
						element={
							<OnlyWhen condition={user.isAuth} otherwise='/login'>
								<ProfilePage />
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
					<Route path='/forgotpassword' element={<ForgotPasswordPage />} />
					<Route
						path='/resetpassword/:resettoken'
						element={<ResetPasswordPage />}
					/>
					<Route
						path='/newPost'
						element={
							<OnlyWhen condition={user.isAuth} otherwise='/login'>
								<NewPostPage />
							</OnlyWhen>
						}
					/>
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
