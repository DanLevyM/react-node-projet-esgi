const User = require('../models/postgres/User');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../lib/token-manager.js');
const { asyncHandler } = require('../middlewares/async');

exports.register = asyncHandler(async (req, res) => {
	const result = await User.create(req.body);
	console.log('USER CREATED ====================================', result);
	res.status(201).json(result);
});

exports.login = asyncHandler(async (req, res) => {
	const result = await User.findOne({
		where: { email: req.body.email },
	});

	console.log('result ==============================', result);
	if (result && (await bcryptjs.compare(req.body.password, result.password))) {
		const token = await createToken(result);
		await result.update({ token });
		res.json({ token });
	} else {
		res.sendStatus(401);
	}
});
