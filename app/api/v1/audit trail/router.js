const { authenticateUser } = require('../../../middlewares/auth');
const {
    FindAll
} = require('./controller');

const express = require('express');
const router = express();

router.get('/audit', authenticateUser, FindAll)


module.exports = router;