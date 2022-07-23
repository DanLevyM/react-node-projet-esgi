/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { userIsAuth } from '../utils/local-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		id: 0,
		isAuth: userIsAuth(),
	});

	const authUser = (bool) => {
		setUser({ ...user, isAuth: bool });
	};

	return (
		<UserContext.Provider value={{ user, authUser }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
