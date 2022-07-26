const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const { sendPost, getPosts } = require('../controllers/posts-controller');

const router = new Router();

router.route('/add').post(checkAuthentication, sendPost);
router.route('/all').get(checkAuthentication, getPosts);

module.exports = router;
