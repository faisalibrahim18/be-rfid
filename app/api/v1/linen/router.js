const express = require('express');
const router = express();
const { create, index, update, find, destroy, count, importExcel, exportExcel, countByHospital } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.post('/linen', authenticateUser, create);

router.get('/linen', authenticateUser, index);

router.get('/linenCount', authenticateUser, count);

router.get('/linen/:id', authenticateUser, find);

router.put('/linen/:id', authenticateUser, update);

router.delete('/linen/:id', authenticateUser, destroy);

router.post('/importLinen',authenticateUser, upload,  importExcel);

router.get('/exportLinen',authenticateUser, exportExcel);

router.get('/hospital/:id/linen',authenticateUser, countByHospital);


module.exports = router;