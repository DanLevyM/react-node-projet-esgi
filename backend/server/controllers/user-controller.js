const User = require('../models/postgres/User');
const UsersFriends = require('../models/postgres/UsersFriends');
const { ValidationError } = require('sequelize');
// const ErrorResponse = require('../utils/errorResponse');
const { formatError } = require('../utils/formatError');
const { getRandomString } = require('../utils/getRandomString');
const { asyncHandler } = require('../middlewares/async');

// @desc    Get all users
// @path    GET /api/v1/users
// @access  Private
exports.getUsers = async (req, res) => {
	try {
		const result = await User.findAll({ where: req.query });
		res.json(result);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};

// @desc    Get 1 user
// @path    GET /api/v1/users/:id
// @access  Private
exports.getUser = async (req, res) => {
	try {
		const result = await User.findByPk(req.params.id);
		if (!result) {
			res.sendStatus(404);
		} else {
			res.json(result);
		}
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};

// @desc    Delete my account
// @path    DELETE /api/v1/users/:id
// @access  Private
exports.deleteMe = async (req, res) => {
	if (req.user.id !== parseInt(req.params.id, 10)) {
		return res.sendStatus(403);
	}

	try {
		// Anonymize the user and keep datas
		const [, rows] = await User.update(
			{
				email: `${getRandomString()}@gmail.com`,
				password: getRandomString(),
				firstName: 'Deleted',
				lastName: null,
				token: null,
				isActive: false,
			},
			{
				where: { id: parseInt(req.params.id, 10) },
				returning: true,
				individualHooks: true,
			}
		);
		if (!rows[0]) {
			res.sendStatus(407);
		} else {
			res.json(rows[0]);
		}

		// const nbline = await User.destroy({
		// 	where: {
		// 		id: req.params.id,
		// 	},
		// });
		// if (!nbline) {
		// 	res.sendStatus(404);
		// } else res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

// @desc    Update my account
// @path    PUT /api/v1/users/:id
// @access  Private
exports.updateMe = async (req, res) => {
	if (req.user.id !== parseInt(req.params.id, 10)) {
		return res.sendStatus(403);
	}
	try {
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
	} catch (error) {
		console.error(error);
		if (error instanceof ValidationError) {
			res.status(422).json(formatError(error));
		} else {
			res.sendStatus(500);
		}
	}
};

// @desc    Get my profile
// @path    GET /api/v1/users/me
// @access  Private
exports.getMe = async (req, res) => {
	try {
		const result = await User.findOne({ where: { id: req.user.id } });
		res.json(result);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};

const handleNewFriendRequest = ({ user_low, user_high }, res) => {
	if (user_low < user_high) {
		return {
			user_low: user_low,
			user_high: user_high,
			status: 'user_low_pending_request',
		};
	} else if (user_low > user_high) {
		return {
			user_low: user_high,
			user_high: user_low,
			status: 'user_high_pending_request',
		};
	} else {
		res.json({ message: 'Same id for sender and receiver !' }, 422);
		// throw new ErrorResponse('qwe', 423);
	}
};

// FRIENDS

// @desc    send friend request
// @path    POST /api/v1/users/addfriend
// @access  Private
exports.sendFriendRequest = asyncHandler(async (req, res) => {
	if (
		!(await User.findByPk(req.body.user_low)) ||
		!(await User.findByPk(req.body.user_high))
	)
		res.json({ message: 'User does not exists' }, 422);

	const datas = handleNewFriendRequest(req.body, res);
	const relationAlreadyExists = await UsersFriends.findOne({
		where: { user_low: datas.user_low, user_high: datas.user_high },
	});
	if (relationAlreadyExists)
		res.json({ message: 'Relation already exists' }, 422);

	const result = await UsersFriends.create(datas);
	if (result) res.json(result, 201);
});
