const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const {
	sendFriendRequest,
	showFriendsList,
} = require('../controllers/friends-controller');

const router = new Router();

router.route('/show/:id').get(checkAuthentication, showFriendsList);
router.route('/add').post(sendFriendRequest);

module.exports = router;
