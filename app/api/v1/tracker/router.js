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

router.post('/tracker/tracker', authenticateUser, create);

router.put('/tracker/checking/:id', authenticateUser, checking);

router.put('/tracker/transit/:id', authenticateUser, transit);

router.put('/tracker/accepted/:id',authenticateUser, accepted);

router.put('/tracker/wash/:id',authenticateUser, wash);

router.put('/tracker/dry/:id', authenticateUser, dry);

router.put('/tracker/done/:id',authenticateUser, done);

module.exports = router;