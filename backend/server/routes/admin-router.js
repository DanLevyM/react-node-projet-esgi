const { Router } = require("express");
const checkAuthentication = require("../middlewares/check-auth");
const { addUser } = require("../controllers/admin-controller");

const router = new Router();

router.route("/adduser").post(checkAuthentication, addUser);

module.exports = router;

// TODO handle PUT for admin and users
// TODO post.user for admin
// TODO delete.user for admin
