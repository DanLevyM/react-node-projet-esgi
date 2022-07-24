export const getUsers = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
};
