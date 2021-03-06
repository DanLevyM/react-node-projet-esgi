const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const {
	sendFriendRequest,
	showFriendsList,
	showPendingFriendsList,
	showFriendsRequests,
	showBlockedUsers,
	answerFriendsRequest,
	blockUser,
	unblockUser,
	deleteFriend,
	deleteFriendRequest,
	getAllRelations,
} = require('../controllers/relations-controller');

const router = new Router();

router.route('/pendings').get(checkAuthentication, showPendingFriendsList);
router.route('/requests').get(checkAuthentication, showFriendsRequests);
router.route('/block').post(checkAuthentication, blockUser);
router.route('/unblock').post(checkAuthentication, unblockUser);
router.route('/users-blocked').get(checkAuthentication, showBlockedUsers);
router.route('/show/:id').get(checkAuthentication, showFriendsList);
router.route('/relations').get(checkAuthentication, getAllRelations);

router.route('/request-answer').post(checkAuthentication, answerFriendsRequest);
router.route('/add').post(checkAuthentication, sendFriendRequest);
router
	.route('/delete/pending')
	.delete(checkAuthentication, deleteFriendRequest);
router.route('/delete').delete(checkAuthentication, deleteFriend);

module.exports = router;
