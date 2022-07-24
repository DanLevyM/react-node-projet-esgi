export const registerUser = async (postData) => {
	const res = await fetch('http://localhost:3001/api/v1/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: postData,
	});

	if (res.status !== 201) {
		alert('Oups!');
	}
};

export const signInUser = async (postData) => {
	const res = await fetch('http://localhost:3001/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: postData,
	});
	return await res.json();
};
