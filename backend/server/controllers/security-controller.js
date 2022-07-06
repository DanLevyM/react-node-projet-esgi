const User = require("../models/postgres/User");
const { ValidationError } = require("sequelize");
const { formatError } = require("../utils/formatError");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../lib/token-manager.js");

exports.register = async (req, res) => {
	try {
		const result = await User.create(req.body);
		console.log("USER CREATED ====================================", result);
		res.status(201).json(result);
	} catch (error) {
		if (error instanceof ValidationError) {
			console.error(error);
			res.status(422).json(formatError(error));
		} else {
			console.error(error);
			res.sendStatus(500);
		}
	}
};

exports.login = async (req, res) => {
	try {
		console.log(req.body.email);
		const result = await User.findOne({
			where: { email: req.body.email },
		});
		console.log("result ==============================", result);
		if (
			result &&
			(await bcryptjs.compare(req.body.password, result.password))
		) {
			res.json({
				token: await createToken(result),
			});
		} else {
			res.sendStatus(401);
		}
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
