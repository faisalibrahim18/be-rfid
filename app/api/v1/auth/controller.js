const { signin, logout } = require('../../../service/mongoose/auth');

const { StatusCodes } = require('http-status-codes');

const signinUsers = async (req, res, next) => {
    try {
        const result = await signin(req);

        res.status(StatusCodes.CREATED).json({
            data: { token: result }
        });
    } catch (err) {
        next(err);
    }
}

const logoutUsers = async (req, res, next) => {
    try {
        await logout(req);

        res.status(StatusCodes.OK).json({
            message: 'logout successfully'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = { signinUsers, logoutUsers }