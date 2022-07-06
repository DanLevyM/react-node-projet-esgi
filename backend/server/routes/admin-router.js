const { Router } = require("express");
const checkAuthentication = require("../middlewares/check-auth");
const { addUser } = require("../controllers/admin-controller");
const { authorize } = require("../middlewares/authorize");
const router = new Router();

router.route("/adduser").post(checkAuthentication, authorize("admin"), addUser);

module.exports = router;

// TODO handle PUT for admin and users
// TODO post.user for admin
// TODO delete.user for admin
