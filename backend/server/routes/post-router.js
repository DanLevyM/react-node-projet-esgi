const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const { sendPost } = require('../controllers/posts-controller');

const router = new Router();

router.route('/add').post(checkAuthentication, sendPost);

module.exports = router;
