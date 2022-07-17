const { Op } = require('sequelize');
const UsersRelations = require('../models/postgres/UsersRelations');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/postgres/User');

// @path    GET /api/v1/users/show/:id
// @access  Private
// eslint-disable-next-line no-unused-vars
exports.showFriendsList = asyncHandler(async (req, res, next) => {
	// User does not exist
	if ((await User.findOne({ where: { id: req.params.id } })) === null) {
		res.json({ error: 'User error !' });
		return;
	}

	const relations = await getUserRelations(req.params.id);

	if (relations.length === 0) {
		res.json({ friends: ['aa'] });
		return;
	}

	const friendsToParse = getSpecificUserRelation('friends', relations);

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

// @path    POST /api/v1/friends/add
// @access  Private
// @body		{ user_low: int, user_high: int }
exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
	if (req.user.id !== req.body.user_low && req.user.id !== req.body.user_high)
		return next(new ErrorResponse('You cannot do that.', 403));

	if (
		!(await User.findByPk(req.body.user_low)) ||
		!(await User.findByPk(req.body.user_high))
	)
		return next(new ErrorResponse('User does not exist.', 422));

	const datas = handleNewFriendRequest(req.body, res);
	const relationAlreadyExists = await UsersRelations.findOne({
		where: { user_low: datas.user_low, user_high: datas.user_high },
	});
	if (relationAlreadyExists)
		return next(new ErrorResponse('Relation already exists.', 422));
	const result = await UsersRelations.create(datas);
	if (result) res.json(result, 201);
});

// @path    GET /api/v1/friends/show
// @access  Private
exports.showPendingFriendsList = asyncHandler(async (req, res, next) => {
	const relations = await getUserRelations(req.user.id);
	const usersIdPendings = [];
	relations.forEach((relation) => {
		if (
			relation.dataValues.user_low === req.user.id &&
			relation.dataValues.status === 'user_low_pending_request'
		) {
			usersIdPendings.push(relation.dataValues.user_high);
		} else if (
			relation.dataValues.user_high === req.user.id &&
			relation.dataValues.status === 'user_high_pending_request'
		) {
			usersIdPendings.push(relation.dataValues.user_low);
		}
	});

	const pendingsRequests = [];
	for (let i = 0; i < usersIdPendings.length; i++) {
		const userFound = await User.findByPk(usersIdPendings[i]);
		pendingsRequests.push({
			email: userFound.dataValues.email,
			firstName: userFound.dataValues.firstName,
			lastName: userFound.dataValues.lastName,
			id: userFound.dataValues.id,
		});
	}
	res.json({ friends: pendingsRequests });
});

// @path    GET /api/v1/friends/users-blocked
// @access  Private
exports.showBlockedUsers = asyncHandler(async (req, res, next) => {
	const relations = await getUserRelations(req.user.id);
	const usersBlockedId = [];
	relations.forEach((relation) => {
		if (
			relation.dataValues.user_low === req.user.id &&
			relation.dataValues.status === 'user_low_block_high'
		) {
			usersBlockedId.push(relation.dataValues.user_high);
		} else if (
			relation.dataValues.user_high === req.user.id &&
			relation.dataValues.status === 'user_high_block_low'
		) {
			usersBlockedId.push(relation.dataValues.user_low);
		}
	});

	const blockedUsers = [];
	for (let i = 0; i < usersBlockedId.length; i++) {
		const userFound = await User.findByPk(usersBlockedId[i]);
		blockedUsers.push({
			email: userFound.dataValues.email,
			firstName: userFound.dataValues.firstName,
			lastName: userFound.dataValues.lastName,
			id: userFound.dataValues.id,
		});
	}
	res.json({ users_blocked: blockedUsers });
});

// exports.answerFriendsRequest = asyncHandler(async (req, res, next) => {});

// ------------------------------------------------------------
// ------------------------- UTILS ----------------------------
// ------------------------------------------------------------
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

const getUserRelations = async (id) => {
	const relations = await UsersRelations.findAll({
		where: {
			[Op.or]: [{ user_low: id }, { user_high: id }],
		},
	});
	return relations;
};

const getSpecificUserRelation = (status, relations) => {
	return relations.filter((friend) => friend.dataValues.status === status);
};
