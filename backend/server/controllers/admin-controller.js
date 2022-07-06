const { ValidationError } = require("sequelize");
const { User } = require("../models/postgres");
const { formatError } = require("../utils/formatError");

exports.addUser = async (req, res) => {
	try {
		console.log("==================", req.body);
		const result = await User.create(req.body);
		console.log("==================", result);
		res.status(201).json(result);
	} catch (error) {
		if (error instanceof ValidationError) {
			console.error(error);
			res.status(422).json(formatError(error));
		} else {
			res.sendStatus(500);
			console.error(error);
		}
	}
};

exports.deleteUser = async (req, res) => {
	console.log("======================", req.user, parseInt(req.params.id, 10));
	if (req.user.id === parseInt(req.params.id, 10)) {
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

exports.updateUser = async (req, res) => {
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

// TODO handle PUT for admin
// TODO post.user for admin
// TODO delete.user for admin
