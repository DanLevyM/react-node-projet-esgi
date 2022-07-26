export const getUsers = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/posts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
};

export const addPost = async (postData) => {
	const res = await fetch('http://localhost:3001/api/v1/home/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: postData,
	});

	return res.status;
};
