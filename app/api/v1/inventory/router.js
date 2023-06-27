const express = require('express');
const router = express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/inventory',  authenticateUser,  create );

router.get('/inventory', authenticateUser, index);

router.get('/inventoryCount', authenticateUser, count);

router.get('/inventory/:id', authenticateUser, find);

router.put('/inventory/:id', authenticateUser, update);

router.delete('/inventory/:id', authenticateUser, destroy);



module.exports = router