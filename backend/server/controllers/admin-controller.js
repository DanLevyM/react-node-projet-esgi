const { User } = require('../models/postgres');
const { asyncHandler } = require('../middlewares/async');

const { getRandomString } = require('../utils/getRandomString');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Add user
// @path    POST /api/v1/admin/adduser
// @access  Private admin
exports.addUser = asyncHandler(async (req, res) => {
	const result = await User.create(req.body);
	res.status(201).json(result);
});

// @desc    Delete user
// @path    DELETE /api/v1/admin/user/:id
// @access  Private admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
	if (req.user.id === parseInt(req.params.id, 10)) {
		return next(
			new ErrorResponse('Admins can not delete their account themselves.', 403)
		);
	}

	// Anonymize the user and keep datas
	const [, rows] = await User.update(
		{
			email: `${getRandomString()}@gmail.com`,
			password: getRandomString(),
			firstName: 'Deleted',
			lastName: null,
			token: null,
		},
		{
			where: { id: parseInt(req.params.id, 10) },
			returning: true,
			individualHooks: true,
		}
	);
	if (!rows[0]) {
		res.sendStatus(404);
	} else {
		res.json(rows[0]);
	}

	// TODO send datas to noSQL

	// const nbline = await User.destroy({
	// 	where: {
	// 		id: req.params.id,
	// 	},
	// });
	// if (!nbline) {
	// 	res.sendStatus(404);
	// } else res.sendStatus(204);
});

// @desc    Update user info
// @path    PUT /api/v1/admin/user/:id
// @access  Private admin
exports.updateUser = asyncHandler(async (req, res) => {
	const [, rows] = await User.update(req.body, {
		where: { id: parseInt(req.params.id, 10) },
		returning: true,
		individualHooks: true,
	});
	if (!rows[0]) {
		res.sendStatus(404);
	} else {
		res.json(rows[0]);
	}
});
