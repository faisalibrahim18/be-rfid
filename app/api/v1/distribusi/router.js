const express = require('express');
const router = express();
const { create, index, update, find, destroy, download } = require('./controler');
const { authenticateUser, authhorizeRoles } = require('../../../middlewares/auth');


router.post('/distribusi',  create);

router.get('/distribusi',  index);

router.get('/distribusi/:id',  find);

router.put('/distribusi/:id',  update);

router.delete('/distribusi/:id',  destroy);

router.get('/distribusiDownload', download);

module.exports = router;