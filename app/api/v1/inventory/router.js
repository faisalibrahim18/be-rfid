const express = require('express');
const router = express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/inventory', authenticateUser, authhorizeRoles('admin'),  create );

router.get('/inventory', authenticateUser, authhorizeRoles('admin'), index);

router.get('/inventoryCount', authenticateUser, authhorizeRoles('admin'), count);

router.get('/inventory/:id', authenticateUser, authhorizeRoles('admin'), find);

router.put('/inventory/:id', authenticateUser, authhorizeRoles('admin'), update);

router.delete('/inventory/:id', authenticateUser, authhorizeRoles('admin'), destroy);



module.exports = router