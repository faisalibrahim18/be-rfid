const express = require('express');
const router = express();
const {
    index,
    create
} = require('./controller')

router.get('/privilege', index);

router.post('/privilege', create);

module.exports = router;