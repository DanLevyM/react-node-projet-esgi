export const addPost = async (token, body) => {
	const res = await fetch('http://localhost:3001/api/v1/home/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	return res.status;
};

export const getPosts = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/home/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};
