const express = require('express');
const  router = express();
const {
    create,
    index,
    find,
    update,
    destroy
} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/role', authenticateUser, index);

router.post('/role', authenticateUser, create);

router.get('/role/:id', authenticateUser, find)

router.put('/role/:id', authenticateUser, update);

router.delete('/role/:id', authenticateUser, destroy);

module.exports = router;