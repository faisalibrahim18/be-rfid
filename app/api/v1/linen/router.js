const express = require('express');
const router = express();
const { create, index, update, find, destroy } = require('./controller')

router.post('/linen', create);

router.get('/linen', index);

router.get('/linen/:id', find);

router.put('/linen/:id', update);

router.delete('/linen/:id', destroy);

module.exports = router;