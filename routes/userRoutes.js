const userControllers = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();


router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/details/:id', userControllers.getProfile);

module.exports = router;