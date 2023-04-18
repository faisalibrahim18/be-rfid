const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const app = express();
// const cors = require('cors'); jika port terblokir

const usersRouter = require('./app/api/v1/users/router');
const signinRouter = require('./app/api/v1/auth/router');
const hospitalRouter = require('./app/api/v1/hospital/router');
const categoryRouter = require('./app/api/v1/category/router');
const linenRouter = require('./app/api/v1/linen/router');
const inventoryRouter = require('./app/api/v1/inventory/router');
const distribusiRouter = require('./app/api/v1/distribusi/router');

const v1 = '/api/v1/rfid';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'welcome to api rfid'
    })
})

app.use(v1, usersRouter);
app.use(v1, signinRouter);
app.use(v1, hospitalRouter);
app.use(v1, categoryRouter);
app.use(v1, linenRouter);
app.use(v1, inventoryRouter);
app.use(v1, distribusiRouter)

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
