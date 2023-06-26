const express = require('express');
const router = express();
const { create,
    index,
    update,
    find,
    destroy,
    download,
    downloadDistribusiPDF,
    importExcel,
    count,
    downloadTemplateExcel,
    serahTerima,
    generatePdf
} = require('./controler');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');

const upload = require('../../../middlewares/multer');


router.post('/distribusi', upload, create);

router.get('/distribusi', index);

router.get('/distribusi/:id',  find);

router.put('/distribusi/:id', update);

router.delete('/distribusi/:id',  destroy);

router.get('/distribusiDownload', download);

router.get('/distribusiDownloadPdf', downloadDistribusiPDF);

router.post('/distribusi/upload', upload, importExcel);

router.get('/distribusiCount', authenticateUser, count);

router.get('/distribusiDownloadTemplate', downloadTemplateExcel);

router.get('/serahTerima/:id', serahTerima)

router.get('/generatePDFSerahTerima/:id', generatePdf);

module.exports = router;