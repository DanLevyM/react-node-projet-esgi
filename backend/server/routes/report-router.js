const { Router } = require('express');
const checkAuthentication = require('../middlewares/check-auth');
const {
	sendReport
} = require('../controllers/reports-controller');

const router = new Router();

router.route('/add').post(checkAuthentication, sendReport);


module.exports = router;
