const express = require('express');
const router = express();
const {
    index,
    create
} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/privilege', authenticateUser, index);

router.post('/privilege', authenticateUser, create);

module.exports = router;