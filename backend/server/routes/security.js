const bcryptjs = require("bcryptjs");
const { Router } = require("express");
const { ValidationError } = require("sequelize");
const { User } = require("../models/postgres");
const { createToken } = require("../lib/tokenManager.js");
const { formatError } = require("../utils/formatError");

const router = new Router();

router.post("/register", async (req, res) => {
	try {
		const result = await User.create(req.body);
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
});

router.post("/login", async (req, res) => {
	try {
		const result = await User.findOne({ email: req.body.email });
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
});

module.exports = router;
