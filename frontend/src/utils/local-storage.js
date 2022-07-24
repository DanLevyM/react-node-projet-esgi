export const userIsAuth = () => {
	const isAuth = localStorage.getItem('isAuth');

	if (isAuth) return true;
	return false;
};

export const userRole = () => {
	const role = localStorage.getItem('role');

	if (role) return role;
	return false;
};
