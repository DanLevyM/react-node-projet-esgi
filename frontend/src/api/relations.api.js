export const getFriends = async (token, id) => {
	const res = await fetch(`http://localhost:3001/api/v1/friends/show/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};

export const deleteFriend = async (token, id) => {
	const res = await fetch('http://localhost:3001/api/v1/friends/delete', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			id_receiver: id,
		}),
	});
	return await res.json();
};
