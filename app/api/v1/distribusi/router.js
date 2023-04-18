const express = require('express');
const router = express();
const { create, index, update, find, destroy } = require('./controler');

router.post('/distribusi', create);

router.get('/distribusi', index);

router.get('/distribusi/:id', find);

router.put('/distribusi/:id', update);

router.delete('/distribusi/:id', destroy);

module.exports = router;