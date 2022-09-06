const userControllers = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/details', auth.authenticateToken, userControllers.getProfile);

module.exports = router;