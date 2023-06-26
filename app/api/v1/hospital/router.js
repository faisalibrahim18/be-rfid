const express = require('express');
const router = express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer')

router.post('/hospital',   create);

router.get('/hospital',  index);

router.get('/hospital/:id',   find);

router.put('/hospital/:id',    update);

router.delete('/hospital/:id',  destroy);

router.get('/hospitalCount',  count)

module.exports = router;