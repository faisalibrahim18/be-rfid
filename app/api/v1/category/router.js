const express = require('express');
const router =  express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/category', authenticateUser, create);

router.get('/category', authenticateUser,  index);

router.get('/category/:id', authenticateUser,  find);

router.put('/category/:id', authenticateUser,  update);

router.delete('/category/:id', authenticateUser, destroy);

router.get('/categoryCount', authenticateUser, count)

module.exports = router;
