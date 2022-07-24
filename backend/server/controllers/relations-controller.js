/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const { Op } = require('sequelize');
const UsersRelations = require('../models/postgres/UsersRelations');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/postgres/User');

// @path    GET /api/v1/users/show/:id
// @access  Private
exports.showFriendsList = asyncHandler(async (req, res, next) => {
	// User does not exist
	if ((await User.findOne({ where: { id: req.params.id } })) === null)
		return res.json({ error: 'User error !' }, 400);

	const relations = await getUserRelations(req.params.id);

	console.log(relations);
	if (relations.length === 0) return res.json({ friends: [] }, 200);

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

// @path    GET /api/v1/friends/requests
// @access  Private
exports.showFriendsRequests = asyncHandler(async (req, res, next) => {
	const relations = await getUserRelations(req.user.id);
	const usersIdPendings = [];
	relations.forEach((relation) => {
		if (
			relation.dataValues.user_low === req.user.id &&
			relation.dataValues.status === 'user_high_pending_request'
		) {
			usersIdPendings.push(relation.dataValues.user_high);
		} else if (
			relation.dataValues.user_high === req.user.id &&
			relation.dataValues.status === 'user_low_pending_request'
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

// @path    POST /api/v1/friends/add
// @access  Private
// @body		{ id_receiver: int }
exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
	if (req.user.id === parseInt(req.body.id_receiver))
		return next(new ErrorResponse('Same ids.', 400));

	if (!(await User.findByPk(req.body.id_receiver)))
		return next(new ErrorResponse('User does not exist.', 400));

	const datas = orderUsersIds({
		user_low: req.user.id,
		user_high: req.body.id_receiver,
	});

	const relationAlreadyExists = await UsersRelations.findOne({
		where: { user_low: datas.user_low, user_high: datas.user_high },
	});
	if (relationAlreadyExists)
		return next(new ErrorResponse('Relation already exists.', 400));
	const result = await UsersRelations.create(datas);
	if (result) res.json(result, 201);
});

// @path    DEL /api/v1/friends/add
// @access  Private
// @body		{ id_receiver: int }
exports.deleteFriendRequest = asyncHandler(async (req, res, next) => {
	if (req.user.id === parseInt(req.body.id_receiver))
		return next(new ErrorResponse('Same ids.', 400));

	if (!(await User.findByPk(req.body.id_receiver)))
		return next(new ErrorResponse('User does not exist.', 400));

	const datas = orderUsersIds({
		user_low: req.user.id,
		user_high: req.body.id_receiver,
	});

	const relationAlreadyExists = await UsersRelations.destroy({
		where: {
			[Op.and]: [{ user_low: datas.user_low }, { user_high: datas.user_high }],
		},
	});
	if (relationAlreadyExists === 0)
		return next(new ErrorResponse('Relation does not exist !', 400));
	res.json({}, 204);
});

// @path    DEL /api/v1/friends/delete
// @access  Private
// @body		{ id_receiver: int }
exports.deleteFriend = asyncHandler(async (req, res, next) => {
	if (req.user.id === parseInt(req.body.id_receiver))
		return next(new ErrorResponse('Same ids.', 400));

	if (!(await User.findByPk(req.body.id_receiver)))
		return next(new ErrorResponse('User does not exist.', 400));

	const datas = orderUsersIds({
		user_low: req.user.id,
		user_high: req.body.id_receiver,
	});

	const relationAlreadyExists = await UsersRelations.findOne({
		where: { user_low: datas.user_low, user_high: datas.user_high },
	});
	if (!relationAlreadyExists)
		return next(new ErrorResponse('Relation does not exist.', 400));

	console.log(relationAlreadyExists);
	const result = await UsersRelations.destroy({
		where: {
			user_low: datas.user_low,
			user_high: datas.user_high,
		},
	});
	if (result) res.json(204);
});

// @path    POST /api/v1/friends/request-answer
// @access  Private
// @body		{ id_requester: int, answer: string }
exports.answerFriendsRequest = asyncHandler(async (req, res, next) => {
	if (req.user.id === parseInt(req.body.id_requester))
		return next(new ErrorResponse('Same ids!', 422));

	if (!parseInt(req.body.id_requester) || !req.body.answer)
		return next(new ErrorResponse('Request cannot be processed.', 400));

	if (req.body.answer !== 'accept' && req.body.answer !== 'decline')
		return next(new ErrorResponse('#WRA.', 422)); // Wrong Response Answer

	const transmitterUser = await User.findOne({
		where: { id: req.body.id_requester },
	});
	if (!transmitterUser) return next(new ErrorResponse('#NO', 422)); // No User

	const usersRelation = await UsersRelations.findOne({
		where: {
			[Op.or]: [
				{
					[Op.and]: [
						{ user_low: req.user.id },
						{ user_high: req.body.id_requester },
						{ status: 'user_high_pending_request' },
					],
				},
				{
					[Op.and]: [
						{ user_low: req.body.id_requester },
						{ user_high: req.user.id },
						{ status: 'user_low_pending_request' },
					],
				},
			],
		},
	});

	if (!usersRelation) return next(new ErrorResponse('#NFRF', 422)); // No Friend Request Found

	if (req.body.answer === 'accept') {
		usersRelation.update({ status: 'friends' });
		res.json({});
	} else if (req.body.answer === 'decline') {
		usersRelation.destroy();
		res.status(204).json({});
	} else {
		return next(new ErrorResponse('Unknown error', 412));
	}
});

exports.blockUser = asyncHandler(async (req, res, next) => {
	if (!req.body.user_to_block)
		return next(new ErrorResponse('Request cannot be processed.', 422));

	if (req.user.id === parseInt(req.body.user_to_block))
		return next(new ErrorResponse('Same ids!', 422));

	const usersRelationExists = await UsersRelations.findOne({
		where: {
			[Op.or]: [
				{
					[Op.and]: [
						{ user_low: req.user.id },
						{ user_high: req.body.user_to_block },
					],
				},
				{
					[Op.and]: [
						{ user_low: req.body.user_to_block },
						{ user_high: req.user.id },
					],
				},
			],
		},
	});

	if (usersRelationExists) {
		req.user.id < req.body.user_to_block
			? usersRelationExists.update({ status: 'user_low_block_high' })
			: usersRelationExists.update({ status: 'user_high_block_low' });
		return res.json({ usersRelationExists });
	} else {
		req.user.id < req.body.user_to_block
			? usersRelationExists.create({
					user_low: req.user.id,
					user_high: req.body.user_to_block,
					status: 'user_low_block_high',
			  })
			: await UsersRelations.create({
					user_low: req.body.user_to_block,
					user_high: req.user.id,
					status: 'user_high_block_low',
			  });
		res.json({}, 201);
	}
});

exports.unblockUser = asyncHandler(async (req, res, next) => {
	if (!req.body.user_to_unblock)
		return next(new ErrorResponse('Request cannot be processed.', 422));

	if (req.user.id === parseInt(req.body.user_to_unblock))
		return next(new ErrorResponse('Same ids!', 422));

	const usersRelationExists = await UsersRelations.findOne({
		where: {
			[Op.or]: [
				{
					[Op.and]: [
						{ user_low: req.user.id },
						{ user_high: req.body.user_to_unblock },
						{ status: 'user_low_block_high' },
					],
				},
				{
					[Op.and]: [
						{ user_low: req.body.user_to_unblock },
						{ user_high: req.user.id },
						{ status: 'user_high_block_low' },
					],
				},
			],
		},
	});

	if (usersRelationExists) {
		usersRelationExists.destroy();
		return res.json({}, 204);
	}
	return next(new ErrorResponse('#NR', 422)); // No Relation
});

exports.getAllRelations = asyncHandler(async (req, res, next) => {
	const relations = await UsersRelations.findAll({
		where: {
			[Op.or]: [{ user_low: req.user.id }, { user_high: req.user.id }],
		},
	});
	return res.json(relations);
});

// ------------------------------------------------------------
// ------------------------- UTILS ----------------------------
// ------------------------------------------------------------
const orderUsersIds = ({ user_low, user_high }) => {
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
	}
	return null;
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
