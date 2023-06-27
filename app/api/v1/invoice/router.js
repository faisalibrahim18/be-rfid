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

router.post('/invoice', authenticateUser, create);

router.get('/invoice', authenticateUser, index);

router.get('/invoice/:id',  authenticateUser, find);

router.put('/invoice/:id', authenticateUser, update);

router.delete('/invoice/:id', authenticateUser, destroy);

router.get('/invoiceExport', authenticateUser, exportPdf);

router.get('/invoiceUser/:userId', authenticateUser, findByUserId)

module.exports = router;