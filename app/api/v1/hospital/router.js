const express = require('express');
const router = express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/hospital', authenticateUser, authhorizeRoles('admin'), create);

router.get('/hospital', authenticateUser, authhorizeRoles('admin'), index);

router.get('/hospital/:id', authenticateUser, authhorizeRoles('admin'),  find);

router.put('/hospital/:id', authenticateUser, authhorizeRoles('admin'), update);

router.delete('/hospital/:id', authenticateUser, authhorizeRoles('admin'), destroy);

router.get('/hospitalCount', authenticateUser, count)

module.exports = router;