const express = require('express');
const router = express();
const {
    create,
    index,
    update,
    find,
    destroy
} = require('./controller')

router.get('/price', index);
router.post('/price', create);
router.put('/price/:id', update);
router.get('/price/:id', find);
router.delete('/price/:id', destroy);

module.exports = router;