const express = require('express');
const router = express();
const {
    find,
    create
} = require('./controller');

router.get('/access', find);

router.post('/access', create);

module.exports = router;