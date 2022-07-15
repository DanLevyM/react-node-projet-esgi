/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

exports.createToken = async (user) => {
	const token = await jwt.sign(
		{ id: user.id, firstName: user.firstName, role: user.role },
		process.env.JWT_SECRET,
		{
			expiresIn: '1y',
		}
	);

	return token;
};

exports.verifyToken = async (token) => {
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	return { id: decoded.id, firstName: decoded.firstName, role: decoded.role };
};
