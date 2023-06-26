const express = require('express');
const router = express();
const {
    create,
    index,
    find,
    update,
    destroy,
    exportPdf,
    findByUserId
} = require('./controller')

const {
    authenticateUser,
    authhorizeRoles
} = require('../../../middlewares/auth')

router.post('/invoice',  create);

router.get('/invoice', index);

router.get('/invoice/:id', find);

router.put('/invoice/:id', update);

router.delete('/invoice/:id', destroy);

router.get('/invoiceExport', exportPdf);

router.get('/invoiceUser/:userId',  findByUserId)

module.exports = router;