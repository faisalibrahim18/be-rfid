const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthenticatedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    const result = await Users.findOne({ username: username })

    if (!result) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = createJWT({ payload: createTokenUser(result)});

    return token ;
}

module.exports = { signin }