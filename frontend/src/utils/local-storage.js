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

export const userId = () => {
	const id = localStorage.getItem('id');

	if (id) return id;
	return 0;
};
