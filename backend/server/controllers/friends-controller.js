const { Op } = require('sequelize');
const UsersFriends = require('../models/postgres/UsersFriends');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/postgres/User');

// eslint-disable-next-line no-unused-vars
exports.showFriendsList = asyncHandler(async (req, res, next) => {
	// Get all relations of a user
	const friends = await UsersFriends.findAll({
		where: {
			[Op.or]: [{ user_low: req.params.id }, { user_high: req.params.id }],
		},
	});

	// Handle no friend
	if (friends.length === 0) {
		(await User.findOne({ where: { id: req.params.id } })) === null
			? res.json({ error: 'User error' })
			: res.json({ friends: [] });
		return;
	}

	// Get all friends id of a user
	const friendsToParse = friends.filter(
		(friend) => friend.dataValues.status === 'friends'
	);

	const friendsIds = [];
	friendsToParse.forEach((friend) => {
		friend.dataValues.user_low === parseInt(req.params.id)
			? friendsIds.push(friend.dataValues.user_high)
			: friendsIds.push(friend.dataValues.user_low);
	});

	const myFriends = [];
	for (let i = 0; i < friendsIds.length; i++) {
		const userFound = await User.findByPk(friendsIds[i]);
		myFriends.push({
			email: userFound.dataValues.email,
			firstName: userFound.dataValues.firstName,
			lastName: userFound.dataValues.lastName,
			id: userFound.dataValues.id,
		});
	}

	res.json({ friends: myFriends });
});

// @desc    send friend request
// @path    POST /api/v1/users/addfriend
// @access  Private
exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
	if (
		!(await User.findByPk(req.body.user_low)) ||
		!(await User.findByPk(req.body.user_high))
	)
		return next(new ErrorResponse('User does not exists.', 422));

	const datas = handleNewFriendRequest(req.body, res);
	const relationAlreadyExists = await UsersFriends.findOne({
		where: { user_low: datas.user_low, user_high: datas.user_high },
	});
	if (relationAlreadyExists)
		return next(new ErrorResponse('Relation already exists.', 422));
	const result = await UsersFriends.create(datas);
	if (result) res.json(result, 201);
});

// exports.showPendingFriendsList = asyncHandler(async (req, res, next) => {});

// exports.answerFriendsRequest = asyncHandler(async (req, res, next) => {});

// UTILS

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
	}
};
