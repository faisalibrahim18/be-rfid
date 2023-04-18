const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.post('/inventory', create );

router.get('/inventory', index);

router.get('/inventory/:id', find);

router.put('/inventory/:id', update);

router.delete('/inventory/:id', destroy);

module.exports = router