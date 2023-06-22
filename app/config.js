const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
        jwtExpiration: '5s',
        jwtSecret: 'jwtSecret',
}