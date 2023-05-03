const express = require('express');
const router = express();
const { create, index, update, find, destroy } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');

router.post('/linen',authenticateUser, authhorizeRoles('admin'), create);

router.get('/linen',authenticateUser, authhorizeRoles('admin'), index);

router.get('/linen/:id',authenticateUser, authhorizeRoles('admin'), find);

router.put('/linen/:id',authenticateUser, authhorizeRoles('admin'), update);

router.delete('/linen/:id',authenticateUser, authhorizeRoles('admin'), destroy);

module.exports = router;