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

router.post('/invoice', authenticateUser, authhorizeRoles('admin'), create);

router.get('/invoice', index);

router.get('/invoice/:id', find);

router.put('/invoice/:id', update);

router.delete('/invoice/:id', destroy);

router.get('/invoiceExport', exportPdf);

router.get('/invoiceUser/:userId', authenticateUser, authhorizeRoles('admin'), findByUserId)

module.exports = router;