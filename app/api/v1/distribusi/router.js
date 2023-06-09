const express = require('express');
const router = express();
const { create, index, update, find, destroy, download, downloadDistribusiPDF, importExcel, count, downloadTemplateExcel } = require('./controler');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');

const upload = require('../../../middlewares/multer');


router.post('/distribusi', authenticateUser, authhorizeRoles('admin'),  create);

router.get('/distribusi',  index);

router.get('/distribusi/:id', authenticateUser, authhorizeRoles('admin'),  find);

router.put('/distribusi/:id',  update);

router.delete('/distribusi/:id', authenticateUser, authhorizeRoles('admin'), destroy);

router.get('/distribusiDownload', download);

router.get('/distribusiDownloadPdf', downloadDistribusiPDF);

router.post('/distribusi/upload', upload.single('excel'), importExcel);

router.get('/distribusiCount', authenticateUser, count);

router.get('/distribusiDownloadTemplate', downloadTemplateExcel);


module.exports = router;