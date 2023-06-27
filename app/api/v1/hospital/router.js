const express = require('express');
const router = express();
const { create, index, find, update, destroy, count } = require('./controller');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer')

router.post('/hospital',  authenticateUser,  create);

router.get('/hospital', authenticateUser, index);

router.get('/hospital/:id', authenticateUser, find);

router.put('/hospital/:id', authenticateUser,    update);

router.delete('/hospital/:id', authenticateUser,  destroy);

router.get('/hospitalCount', authenticateUser,  count)

module.exports = router;