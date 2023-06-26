const express = require('express');
const router = express();
const { create, index, find, update, destroy, getUserSign, count } = require('./controller');

const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

router.post('/user' ,create);

router.get('/user',   index);

router.get('/userCount',  count);

router.get('/user/:id', find);

router.put('/user/:id',  update);

router.delete('/user/:id',  destroy);

router.get('/getUserSignedIn',  getUserSign)

module.exports = router;    