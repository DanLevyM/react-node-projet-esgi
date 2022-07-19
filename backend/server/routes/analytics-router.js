const { Router } = require('express');
const { addUser, getUsers } = require('../controllers/analytics-controller');

const router = new Router();

router.route('/users').post(addUser).get(getUsers);

module.exports = router;
