const User = require('../models/postgres/User');
const UserAnalitics = require('../models/mongo/UserAnalytics');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @path    GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
	const result = await User.findAll({ where: req.query });
	res.json(result);
});

// @desc    Get 1 user
// @path    GET /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res) => {
	const result = await User.findByPk(req.params.id);
	if (!result) {
		res.sendStatus(404);
	} else {
		res.json(result);
	}
});

// @desc    Delete my account
// @path    DELETE /api/v1/users/me
// @access  Private
exports.deleteMe = asyncHandler(async (req, res, next) => {
	const userToDelete = await User.findByPk(req.user.id);
	const addStatsToUser = {
		role: userToDelete.dataValues.role,
		technologies: userToDelete.dataValues.technologies || '',
	};
	const userToAddForStats = await UserAnalitics.create(addStatsToUser);

	const nbline = await User.destroy({
		where: {
			id: req.user.id,
		},
	});
	if (!nbline) return next(new ErrorResponse('Query error', 404));

	res.json(userToAddForStats, 201);
});

// @desc    Update my account
// @path    PUT /api/v1/users/me
// @access  Private
exports.updateMe = asyncHandler(async (req, res) => {
	const [, rows] = await User.update(req.body, {
		where: { id: parseInt(req.user.id, 10) },
		returning: true,
		individualHooks: true,
	});

	if (!rows[0]) {
		res.sendStatus(404);
	} else {
		res.json(rows[0]);
	}
});

// @desc    Get my profile
// @path    GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
	const result = await User.findOne({ where: { id: req.user.id } });
	res.json(result);
});
