import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { userIsAuth, userRole, userId } from '../utils/local-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		id: userId(),
		isAuth: userIsAuth(),
		role: userRole(),
	});

	const authUser = (id, bool, role) => {
		setUser({ ...user, id, isAuth: bool, role });
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
