const { Router } = require("express");
const checkAuthentication = require("../middlewares/check-auth");
const {
	getUser,
	getUsers,
	deleteMe,
	updateMe,
	getMe,
} = require("../controllers/user-controller");

const router = new Router();

router.route("/").get(checkAuthentication, getUsers);
router.route("/me").get(checkAuthentication, getMe);

router
	.route("/:id")
	.get(checkAuthentication, getUser)
	.put(checkAuthentication, updateMe)
	.delete(checkAuthentication, deleteMe);

module.exports = router;
