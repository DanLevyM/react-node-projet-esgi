const User = require('../models/postgres/User');
const UserAnalitics = require('../models/mongo/UserAnalytics');
const { ValidationError } = require('sequelize');
const { formatError } = require('../utils/formatError');

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
exports.deleteMe = async (req, res, next) => {
	if (req.user.id !== parseInt(req.params.id, 10)) {
		return res.sendStatus(403);
	}

	try {
		const userToDelete = await User.findByPk(req.user.id);
		const addStatsToUser = {
			role: userToDelete.dataValues.role,
			technologies: userToDelete.dataValues.technologies || '',
		};
		const userToAddForStats = await UserAnalitics.create(addStatsToUser);

		const nbline = await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!nbline) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}

		return next(res.json(userToAddForStats));
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
