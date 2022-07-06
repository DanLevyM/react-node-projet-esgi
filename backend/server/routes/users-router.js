const { Router } = require("express");
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
// TODO delete my Account

module.exports = router;

// TODO handle delete only for its own account
// TODO handle PUT for admin and users
// TODO post.user for admin
// TODO delete.user for admin
