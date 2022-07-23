export const userIsAuth = () => {
	const isAuth = localStorage.getItem('isAuth');

	if (isAuth) return true;
	return false;
};
