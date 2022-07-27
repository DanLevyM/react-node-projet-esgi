const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
// const ResetPassword = require('.../frontend/src/pages/ResetPassword/index');
const {
	getUser,
	getUsers,
	deleteMe,
	updateMe,
	getMe,
} = require('../controllers/user-controller');

const router = new Router();

router.route('/');
// router.route('/reset-password').get(ResetPassword, getUsers);
router.route('/').get(checkAuthentication, getUsers);
router
	.route('/me')
	.get(checkAuthentication, getMe)
	.delete(checkAuthentication, deleteMe)
	.put(checkAuthentication, updateMe);

router.route('/:id').get(checkAuthentication, getUser);

module.exports = router;