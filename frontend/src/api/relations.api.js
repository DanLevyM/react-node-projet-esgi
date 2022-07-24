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

export const sendFriendReq = async (token, id) => {
	const res = await fetch('http://localhost:3001/api/v1/friends/add', {
		method: 'POST',
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

export const answerFriendReq = async (token, id_requester, answer) => {
	const res = await fetch(
		'http://localhost:3001/api/v1/friends/request-answer',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				id_requester,
				answer,
			}),
		}
	);
	return await res.json();
};

export const delFriendReq = async (token, id) => {
	await fetch('http://localhost:3001/api/v1/friends/delete/pending', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ id_receiver: id }),
	});
};

export const getPendingReq = async (token, id) => {
	const res = await fetch('http://localhost:3001/api/v1/friends/pendings', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};

export const getFriendsReq = async (token, id) => {
	const res = await fetch('http://localhost:3001/api/v1/friends/requests', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};

export const getAllRelations = async (token) => {
	const res = await fetch('http://localhost:3001/api/v1/friends/relations', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
};
