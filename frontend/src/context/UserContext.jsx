import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { userIsAuth, userRole } from '../utils/local-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		id: 0,
		isAuth: userIsAuth(),
		role: userRole(),
	});

	const authUser = (bool, role) => {
		setUser({ ...user, isAuth: bool, role });
	};

	return (
		<UserContext.Provider value={{ user, authUser }}>
			{children}
		</UserContext.Provider>
	);
}

UserProvider.propTypes = {
	children: PropTypes.node,
};

export default UserContext;
