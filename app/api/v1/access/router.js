const express = require('express');
const router = express();
const {
    find,
    create
} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/access', authenticateUser, find);

router.post('/access', authenticateUser, create);

module.exports = router;