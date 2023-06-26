const express = require('express');
const router = express();
const { create, index, update, find, destroy, count, importExcel, exportExcel, countByHospital } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.post('/linen', create);

router.get('/linen', index);

router.get('/linenCount', count);

router.get('/linen/:id', find);

router.put('/linen/:id', update);

router.delete('/linen/:id', destroy);

router.post('/importLinen', upload,  importExcel);

router.get('/exportLinen', exportExcel);

router.get('/hospital/:id/linen', countByHospital);


module.exports = router;