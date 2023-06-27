const express = require('express');
const router = express();
const { create, index, find, update, destroy, getUserSign, count } = require('./controller');

const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

router.post('/user', authenticateUser, create);

router.get('/user',  authenticateUser, index);

router.get('/userCount', authenticateUser, count);

router.get('/user/:id', authenticateUser, find);

router.put('/user/:id', authenticateUser,  update);

router.delete('/user/:id', authenticateUser, destroy);

router.get('/getUserSignedIn', authenticateUser,  getUserSign)

module.exports = router;    