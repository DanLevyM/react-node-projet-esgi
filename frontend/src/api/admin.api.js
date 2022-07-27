export const getUsers = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};

export const getUser = async (token, id) => {
	const res = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};

export const updateUser = async (token, id, body) => {
	const res = await fetch(`http://localhost:3001/api/v1/admin/user/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	return await res.json();
};

export const deleteUser = async (token, id) => {
	const res = await fetch(`http://localhost:3001/api/v1/admin/user/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};
