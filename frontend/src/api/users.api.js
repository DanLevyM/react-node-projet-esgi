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

export const getMe = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
};

export const updateMe = async (token, body) => {
	const res = await fetch('http://localhost:3001/api/v1/users/me', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	return res.json();
};

export const deleteMe = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/users/me', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
};
