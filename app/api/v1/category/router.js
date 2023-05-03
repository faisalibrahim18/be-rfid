const express = require('express');
const router =  express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/category', authenticateUser, authhorizeRoles('admin'), create);

router.get('/category', authenticateUser, authhorizeRoles('admin'), index);

router.get('/category/:id', authenticateUser, authhorizeRoles('admin'), find);

router.put('/category/:id', authenticateUser, authhorizeRoles('admin'), update);

router.delete('/category/:id', authenticateUser, authhorizeRoles('admin'), destroy);

module.exports = router;
