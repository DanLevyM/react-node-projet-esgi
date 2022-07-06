const { Router } = require("express");
const { ValidationError } = require("sequelize");
const { User } = require("../models/postgres");
const { formatError } = require("../utils/formatError");
const checkAuthentication = require("../middlewares/check-auth");
const {
	getUser,
	getUsers,
	deleteUser,
	updateUser,
} = require("../controllers/user-controller");

const router = new Router();

router.route("/users").get(checkAuthentication, getUsers);
router
	.route("/users/:id")
	.get(checkAuthentication, getUser)
	.put(checkAuthentication, updateUser)
	.delete(checkAuthentication, deleteUser);

// TODO Move to admin route
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

module.exports = router;

// TODO handle delete only for its own account
// TODO handle PUT for admin and users
// TODO post.user for admin
// TODO delete.user for admin
