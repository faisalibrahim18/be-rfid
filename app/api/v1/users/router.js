const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

router.post('/user', authenticateUser, authhorizeRoles('admin') ,create);

router.get('/user', authenticateUser, index);

router.get('/user/:id', find);

router.put('/user/:id', update);

router.delete('/user/:id', destroy);

module.exports = router;