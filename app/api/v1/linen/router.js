const express = require('express');
const router = express();
const { create, index, update, find, destroy, count, importExcel, exportExcel } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.post('/linen',authenticateUser, authhorizeRoles('admin'), create);

router.get('/linen',authenticateUser, authhorizeRoles('admin'), index);

router.get('/linenCount',authenticateUser, authhorizeRoles('admin'), count);

router.get('/linen/:id',authenticateUser, authhorizeRoles('admin'), find);

router.put('/linen/:id',authenticateUser, authhorizeRoles('admin'), update);

router.delete('/linen/:id',authenticateUser, authhorizeRoles('admin'), destroy);

router.post('/importLinen', upload,  importExcel);

router.get('/exportLinen', exportExcel )


module.exports = router;