/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const Post = require('../models/postgres/Post');
const { asyncHandler } = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/postgres/User');

// @path    POST /api/v1/home/add
// @access  Private
// @body		{ user_post: int }
// @body		{ content: string }
exports.sendPost = asyncHandler(async (req, res, next) => {

	const data = {
		user_post: req.user.id,
		content: req.body.comment,
	};
	const result = await Post.create(data);
	if (result) res.json(result, 201);
	res.json('Post not sent.', 400);
});

exports.getPosts = asyncHandler(async (req, res) => {
	const result = await Post.findAll();
	res.json(result);
});
