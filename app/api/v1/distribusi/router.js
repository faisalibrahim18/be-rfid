const express = require('express');
const router = express();
const { create, index, update, find, destroy, download, downloadDistribusiPDF } = require('./controler');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/distribusi', authenticateUser, authhorizeRoles('admin'),  create);

router.get('/distribusi',  index);

router.get('/distribusi/:id', authenticateUser, authhorizeRoles('admin'),  find);

router.put('/distribusi/:id',  update);

router.delete('/distribusi/:id', authenticateUser, authhorizeRoles('admin'), destroy);

router.get('/distribusiDownload', download);

router.get('/distribusiDownloadPdf', downloadDistribusiPDF);

module.exports = router;