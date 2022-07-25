export const registerUser = async (postData) => {
	const res = await fetch('http://localhost:3001/api/v1/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: postData,
	});

	if (res.status !== 201) {
		const a = await res.json();
		if (a.message.includes('password'))
			alert('Please insert a correct password');
		else alert('Please add a correct email');
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
