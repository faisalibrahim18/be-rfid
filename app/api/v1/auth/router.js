const express = require('express');
const router = express()
const { signinUsers, logoutUsers } = require('./controller') 

router.post('/signin/user', signinUsers);

router.post('/logout', logoutUsers)
module.exports = router;