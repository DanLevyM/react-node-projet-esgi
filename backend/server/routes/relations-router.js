const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const {
	sendFriendRequest,
	showFriendsList,
	showPendingFriendsList,
	showBlockedUsers,
	answerFriendsRequest,
	blockUser,
	unblockUser,
} = require('../controllers/relations-controller');

const router = new Router();

router.route('/pendings').get(checkAuthentication, showPendingFriendsList);
router.route('/block').post(checkAuthentication, blockUser);
router.route('/unblock').post(checkAuthentication, unblockUser);
router.route('/users-blocked').get(checkAuthentication, showBlockedUsers);
router.route('/show/:id').get(checkAuthentication, showFriendsList);

router.route('/request-answer').post(checkAuthentication, answerFriendsRequest);
router.route('/add').post(checkAuthentication, sendFriendRequest);

module.exports = router;
