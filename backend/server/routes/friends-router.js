const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const {
	sendFriendRequest,
	showFriendsList,
	showPendingFriendsList,
	showBlockedUsers,
} = require('../controllers/relations-controller');

const router = new Router();

router.route('/pendings').get(checkAuthentication, showPendingFriendsList);
router.route('/users-blocked').get(checkAuthentication, showBlockedUsers);
router.route('/show/:id').get(checkAuthentication, showFriendsList);
router.route('/add').post(checkAuthentication, sendFriendRequest);

module.exports = router;
