const express = require('express');
const router =  express();
const { create, index, find, update, destroy } = require('./controller');

router.post('/category', create);

router.get('/category', index);

router.get('/category/:id', find);

router.put('/category/:id', update);

router.delete('/category/:id', destroy);

module.exports = router;
