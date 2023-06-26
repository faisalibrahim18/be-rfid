const express = require('express');
const router =  express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/category', create);

router.get('/category',  index);

router.get('/category/:id',  find);

router.put('/category/:id',  update);

router.delete('/category/:id',  destroy);

router.get('/categoryCount', authenticateUser, count)

module.exports = router;
