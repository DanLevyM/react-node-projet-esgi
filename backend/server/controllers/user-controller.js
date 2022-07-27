const User = require('../models/postgres/User');
const UserAnalitics = require('../models/mongo/UserAnalytics');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all users
// @path    GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
	const result = await User.findAll({ where: req.query });
	res.json(result);
});

// @desc    Get 1 user
// @path    GET /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res) => {
	const result = await User.findByPk(req.params.id);
	if (!result) {
		res.sendStatus(404);
	} else {
		res.json(result);
	}
});

// @desc    Delete my account
// @path    DELETE /api/v1/users/me
// @access  Private
exports.deleteMe = asyncHandler(async (req, res, next) => {
	const userToDelete = await User.findByPk(req.user.id);
	const addStatsToUser = {
		role: userToDelete.dataValues.role,
		technologies: userToDelete.dataValues.technologies || '',
	};
	const userToAddForStats = await UserAnalitics.create(addStatsToUser);

	const nbline = await User.destroy({
		where: {
			id: req.user.id,
		},
	});
	if (!nbline) return next(new ErrorResponse('Query error', 404));

	res.json(userToAddForStats, 201);
});

// @desc    Update my account
// @path    PUT /api/v1/users/me
// @access  Private
exports.updateMe = asyncHandler(async (req, res) => {
	const [, rows] = await User.update(req.body, {
		where: { id: parseInt(req.user.id, 10) },
		returning: true,
		individualHooks: true,
	});

	if (!rows[0]) {
		res.sendStatus(404);
	} else {
		res.json(rows[0]);
	}
});

// @desc    Get my profile
// @path    GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
	const result = await User.findOne({ where: { id: req.user.id } });
	res.json(result);
});

// @desc    Forgot pwd
// @path    POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ where: { email: req.body.email } });
	if (!user)
		return next(new ErrorResponse('There is no user with that email', 404));

	const resetToken = crypto.randomBytes(20).toString('hex');

	const resetPwdToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	const resetPwdExpire = Date.now() + 10 * 60 * 1000;
	const [, rows] = await User.update(
		{
			resetPwdToken,
			resetPwdExpire,
		},
		{
			where: { email: req.body.email },
			returning: true,
			individualHooks: true,
		}
	);

	if (!rows[0]) {
		return next(res.sendStatus(404));
	}
	const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;

	const message = `<h2>You are receiving this email because you have requested the reset of your password.</h2> <p>Please make a put request to: \n\n</p><p> <strong>${resetUrl}</strong></p>`;

	try {
		sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		});
		res.status(200).json({ success: true, data: 'Email sent.' });
	} catch (e) {
		console.error(e);
	}

	return next(new ErrorResponse('Email could not be send', 500));
});

// @path    PUT /api/v1/users/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	const resetPwdToken = crypto
		.createHash('sha256')
		.update(req.query.resettoken)
		.digest('hex');

	const user = await User.findOne({
		where: { resetPwdToken },
	});

	if (!user) return next(new ErrorResponse('Invalid token', 500));

	res.json({ success: true, token: resetPwdToken });
});

// @path    PUT /api/v1/users/update-pwd-after-reset
// @access  Private
exports.updateMeAfterResetPwd = asyncHandler(async (req, res) => {
	const [, rows] = await User.update(
		{ password: req.body.password },
		{
			where: { resetPwdToken: req.body.resetPwdToken },
			returning: true,
			individualHooks: true,
		}
	);

	if (!rows[0]) {
		res.sendStatus(404);
	} else {
		res.json(rows[0]);
	}
});
