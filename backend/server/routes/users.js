const { Router } = require("express");
const { ValidationError } = require("sequelize");
const { User } = require("../models/postgres");
const { formatError } = require("../utils/formatError");
const checkAuthentication = require("../middlewares/checkAuth");

const router = new Router();

router.get("/users", checkAuthentication, async (req, res) => {
	try {
		const result = await User.findAll({ where: req.query });
		res.json(result);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
});

router.post("/users", async (req, res) => {
	try {
		console.log("==================", req.body);
		const result = await User.create(req.body);
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
});

router.delete("/users/:id", async (req, res) => {
	// console.log("======================", req.user);
	// if (req.user.id !== parseInt(req.params.id, 10)) {
	// 	return res.sendStatus(403);
	// }
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
});

router.put("/users/:id", checkAuthentication, async (req, res) => {
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
});

router.get("/users/:id", checkAuthentication, async (req, res) => {
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
});

module.exports = router;

// TODO handle delete only for its own account
// TODO handle PUT for admin and users
// TODO post.user for admin
// TODO delete.user for admin
