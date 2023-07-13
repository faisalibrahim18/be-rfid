const express = require('express');
const router = express()
const {
    create,
    checking,
    transit,
    accepted,
    wash,
    dry,
    done,
    find,
    count,
    exportWash,
    backHospital,
    serahTerima,
    generatePdf
} = require('./controller')
const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

const upload = require('../../../middlewares/multer');
// router.get('/tracker', index)

router.post('/tracker', create);

router.get('/tracker/:id', find);

router.get('/trackerCount', count);

router.put('/tracker/checking/:id',authenticateUser, upload,checking);

router.put('/tracker/transit/:id',authenticateUser, transit);

router.put('/tracker/accepted/:id',authenticateUser, upload,accepted);

router.put('/tracker/wash/:id',authenticateUser, upload, wash);

router.put('/tracker/dry/:id',authenticateUser, upload, dry);

router.put('/tracker/delivery/:id',authenticateUser, backHospital)

router.put('/tracker/done/:id',authenticateUser, upload,done);

router.get('/tracker/exportWash/:id', exportWash)



module.exports = router;