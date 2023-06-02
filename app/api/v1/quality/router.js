const {
    find,
    index,
    create,
    destroy,
    update
} = require('./controller');

const express = require('express');
const router = express();

router.post('/quality', create);

router.get('/quality', index);

router.get('/quality/:id', find);

router.put('/quality/:id', update);

router.delete('/quality/:id', destroy);

module.exports = router;


