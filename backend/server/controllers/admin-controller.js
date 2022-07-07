const { User } = require("../models/postgres");
const { asyncHandler } = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

exports.addUser = asyncHandler(async (req, res) => {
	const result = await User.create(req.body);
	res.status(201).json(result);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
	console.log("======================", req.user, parseInt(req.params.id, 10));
	if (req.user.id === parseInt(req.params.id, 10)) {
		return next(
			new ErrorResponse("Admins can not delete their account themselves.", 403)
		);
	}
	const nbline = await User.destroy({
		where: {
			id: req.params.id,
		},
	});
	if (!nbline) {
		res.sendStatus(404);
	} else res.sendStatus(204);
});

exports.updateUser = asyncHandler(async (req, res) => {
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
});
