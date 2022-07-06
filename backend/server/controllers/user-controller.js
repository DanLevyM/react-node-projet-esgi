const User = require("../models/postgres/User");
const { ValidationError } = require("sequelize");
const { formatError } = require("../utils/formatError");

exports.getUsers = async (req, res) => {
	try {
		const result = await User.findAll({ where: req.query });
		res.json(result);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};

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

exports.deleteMe = async (req, res) => {
	console.log("======================", req.user, parseInt(req.params.id, 10));
	if (req.user.id !== parseInt(req.params.id, 10)) {
		return res.sendStatus(403);
	}
	try {
		const nbline = await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!nbline) {
			res.sendStatus(404);
		} else res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};

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
		if (error instanceof ValidationError) {
			res.status(422).json(formatError(error));
		} else {
			res.sendStatus(500);
			console.error(error);
		}
	}
};

exports.getMe = async (req, res) => {
	try {
		const result = await User.findOne({ where: { id: req.user.id } });
		res.json(result);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
};
