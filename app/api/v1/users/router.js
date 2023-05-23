const express = require('express');
const router = express();
const { create, index, find, update, destroy, getUserSign, count } = require('./controller');

const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

router.post('/user',authenticateUser, authhorizeRoles('admin') ,create);

router.get('/user', authenticateUser, authhorizeRoles('admin'), authenticateUser, index);

router.get('/userCount', authenticateUser, authhorizeRoles('admin'), authenticateUser, count);

router.get('/user/:id', find);

router.put('/user/:id', authenticateUser, update);

router.delete('/user/:id', authenticateUser, authhorizeRoles('admin'), destroy);

router.get('/getUserSignedIn', authenticateUser, getUserSign)

module.exports = router;    