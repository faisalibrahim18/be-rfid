const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');


const app = express();
const cors = require('cors');

const usersRouter = require('./app/api/v1/users/router');
const signinRouter = require('./app/api/v1/auth/router');
const hospitalRouter = require('./app/api/v1/hospital/router');
const categoryRouter = require('./app/api/v1/category/router');
const linenRouter = require('./app/api/v1/linen/router');
const inventoryRouter = require('./app/api/v1/inventory/router');
const distribusiRouter = require('./app/api/v1/distribusi/router');
const trackerRouter = require('./app/api/v1/tracker/router');
const qualityRouter = require('./app/api/v1/quality/router');
const invoisRouter = require('./app/api/v1/invoice/router');
const accessRouter = require('./app/api/v1/access/router');
const privilegeRouter = require('./app/api/v1/privilege/router');
const roleRouter = require('./app/api/v1/role/router');
const priceRouter = require('./app/api/v1/price/router');
const auditRouter = require('./app/api/v1/audit trail/router');
const { checkExpiredLinen } = require('./app/service/mongoose/linen');
checkExpiredLinen();

const v1 = '/api/v1/rfid';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

app.set('view engine', 'ejs');
app.use(
    cors({
        credentials: true,
        origin: "https://lms-rfid.netlify.app",
    }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

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
app.use(v1, distribusiRouter);
app.use(v1, trackerRouter);
app.use(v1, qualityRouter);
app.use(v1, invoisRouter);
app.use(v1, accessRouter);
app.use(v1, privilegeRouter);
app.use(v1, roleRouter);
app.use(v1, priceRouter)
app.use(v1, auditRouter)


app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
