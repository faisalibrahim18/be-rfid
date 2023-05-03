const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/hospital',  create);

router.get('/hospital', index);

router.get('/hospital/:id',  find);

router.put('/hospital/:id', update);

router.delete('/hospital/:id', destroy);

module.exports = router;