const express = require('express');
const router = express();
const { create, index, update, find, destroy, download } = require('./controler');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/distribusi', authenticateUser, authhorizeRoles('admin'), create);

router.get('/distribusi', authenticateUser, authhorizeRoles('admin'), index);

router.get('/distribusi/:id', authenticateUser, authhorizeRoles('admin'), find);

router.put('/distribusi/:id', authenticateUser, authhorizeRoles('admin'), update);

router.delete('/distribusi/:id', authenticateUser, authhorizeRoles('admin'), destroy);

router.get('/distribusiDownload', authenticateUser, authhorizeRoles('admin'), download);

module.exports = router;