const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthenticatedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../../config');

const signin = async (req, res, next) => {
    const { username, password } = req.body;


    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    // const result = await Users.findOne({ username: username })

    if (!result) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')

    }

    result.is_login = true,
        await result.save()

    const token = createJWT({ payload: createTokenUser(result) });

    return token;
}

const logout = async (req, res, next) => {
    
        const { id } = req.user;

        const user = await Users.findOne({ _id: id });

        user.is_login = false;
        await user.save()

        return user;
}
module.exports = { signin, logout }