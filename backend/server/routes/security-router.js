const { Router } = require('express');
const { register, login } = require('../controllers/security-controller');

const router = new Router();

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
