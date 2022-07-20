import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

export default function MyRouter() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/register' element={<RegisterPage />}></Route>
					<Route path='/login' element={<LoginPage />}></Route>
					{/* <Route path='*' element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}
