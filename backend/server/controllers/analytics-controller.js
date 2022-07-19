/* eslint-disable no-unused-vars */
const UserAnalitics = require('../models/mongo/UserAnalytics');
const { asyncHandler } = require('../middlewares/async');

exports.addUser = asyncHandler(async (req, res, next) => {
	const user = await UserAnalitics.create(req.body);
	res.json(user);
});

exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await UserAnalitics.find();
	res.json(users);
});
