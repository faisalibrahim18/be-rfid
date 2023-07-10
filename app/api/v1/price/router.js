const express = require('express');
const router = express();
const {
    create,
    index,
    update,
    find
} = require('./controller')

router.get('/price', index);
router.post('/price', create);
router.put('/price', update);
router.get('/price/:id', find);

module.exports = router;