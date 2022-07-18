/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const Report = require('../models/postgres/Report');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/postgres/User');

// @path    POST /api/v1/friends/add
// @access  Private
// @body		{ id_user_reported: int }
exports.sendReport = asyncHandler(async (req, res, next) => {
	if (!req.body.id_user_reported || !req.body.reason) {
		return next(new ErrorResponse('Unprocessable entity', 422));
	}

	if (req.user.id === parseInt(req.body.id_user_reported))
		return next(new ErrorResponse('Same ids.', 422));

	if (!(await User.findByPk(req.body.id_user_reported)))
		return next(new ErrorResponse('User does not exist.', 422));

	const relationAlreadyExists = await Report.findOne({
		where: {
			user_id: req.user.id,
			user_id_reported: req.body.id_user_reported,
		},
	});
	if (relationAlreadyExists)
		return next(new ErrorResponse('Already reported.', 422));

	const data = {
		user_id: req.user.id,
		user_id_reported: req.body.id_user_reported,
		reason: req.body.reason,
		comment: req.body.comment,
	};
	const result = await Report.create(data);
	if (result) res.json(result, 201);
	res.json('Report not sent.', 400);
});
