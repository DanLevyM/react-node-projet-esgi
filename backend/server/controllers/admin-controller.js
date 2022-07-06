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
