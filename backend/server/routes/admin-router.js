const { Router } = require("express");
const checkAuthentication = require("../middlewares/check-auth");
const {
	addUser,
	deleteUser,
	updateUser,
} = require("../controllers/admin-controller");
const { authorize } = require("../middlewares/authorize");
const router = new Router();

router.route("/adduser").post(checkAuthentication, authorize("admin"), addUser);
router
	.route("/user/:id")
	.delete(checkAuthentication, authorize("admin"), deleteUser)
	.put(checkAuthentication, authorize("admin"), updateUser);

module.exports = router;
