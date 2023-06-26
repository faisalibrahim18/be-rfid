const express = require('express');
const  router = express();
const {
    create,
    index,
    find,
    update,
    destroy
} = require('./controller')

router.get('/role', index);

router.post('/role', create);

router.get('/role/:id', find)

router.put('/role/:id', update);

router.delete('/role/:id', destroy);

module.exports = router;