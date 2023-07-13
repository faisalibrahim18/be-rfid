const express = require('express');
const router = express()
const { signinUsers, logoutUsers } = require('./controller'); 
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/signin/user', signinUsers);

router.post('/logout', authenticateUser, logoutUsers)
module.exports = router;