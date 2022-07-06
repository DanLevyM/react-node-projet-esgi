// import express from "express";
// import {
// 	getUsers,
// 	getUser,
// 	createUser,
// 	updateUser,
// 	deleteUser,
// 	getForms,
// 	deleteForm,
// 	addUser,
// } from "../controllers/admin.controller.js";

// import { protect, authorize } from "../middleware/auth.js";

// // eslint-disable-next-line new-cap
// const router = express.Router();

// router
// 	.route("/users/")
// 	.get(protect, authorize("admin"), getUsers)
// 	.post(protect, authorize("admin"), createUser);

// router
// 	.route("/user/:id")
// 	.get(protect, authorize("admin"), getUser)
// 	.put(protect, authorize("admin"), updateUser)
// 	.delete(protect, authorize("admin"), deleteUser);

// router.get("/contact", protect, authorize("admin"), getForms);
// router.post("/contact/adduser/:id", protect, authorize("admin"), addUser);
// router.delete("/contact/:id", protect, authorize("admin"), deleteForm);

// export default router;
