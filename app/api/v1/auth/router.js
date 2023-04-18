const express = require('express');
const router = express()
const { signinUsers } = require('./controller') 

router.post('/signin/user', signinUsers);

module.exports = router;