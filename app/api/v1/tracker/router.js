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
    backHospital
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

router.put('/tracker/checking/:id', upload,checking);

router.put('/tracker/transit/:id', transit);

router.put('/tracker/accepted/:id', upload,accepted);

router.put('/tracker/wash/:id', upload, wash);

router.put('/tracker/dry/:id', upload, dry);

router.put('/tracker/delivery/:id', backHospital)

router.put('/tracker/done/:id', upload ,done);

router.get('/tracker/exportWash/:id', exportWash)

module.exports = router;