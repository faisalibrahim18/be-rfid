const express = require('express');
const router = express();
const {
    create,
    index,
    find,
    update,
    destroy,
    findByUserId,
    invoicePage,
    generatePdf
} = require('./controller')

const {
    authenticateUser,
    authhorizeRoles
} = require('../../../middlewares/auth')

router.post('/invoice', authenticateUser, create);

router.get('/invoice', index);

router.get('/invoice/:id',  authenticateUser, find);

router.put('/invoice/:id', authenticateUser, update);

router.delete('/invoice/:id', authenticateUser, destroy);

router.get('/invoiceExport/:id',  generatePdf);

router.get('/invoiceUser/:userId', authenticateUser, findByUserId);

router.get('/invoiceView/:id', invoicePage)

module.exports = router;