const express = require('express');
const router = express()
const {
    create,
    checking,
    transit,
    accepted,
    wash,
    dry,
    done
} = require('./controller')
const {
    authenticateUser,
    authhorizeRoles,
} = require('../../../middlewares/auth');

// router.get('/tracker', index)

router.post('/tracker', create);

router.put('/tracker/checking/:id', authenticateUser, authhorizeRoles('admin'),  checking);

router.put('/tracker/transit/:id', authenticateUser, authhorizeRoles('admin'), transit);

router.put('/tracker/accepted/:id', authenticateUser, authhorizeRoles('admin'), accepted);

router.put('/tracker/wash/:id', authenticateUser, authhorizeRoles('admin'), wash);

router.put('/tracker/dry/:id',  authenticateUser, authhorizeRoles('admin'), dry);

router.put('/tracker/done/:id', authenticateUser, authhorizeRoles('admin'),  done);

module.exports = router;