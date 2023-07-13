const Audit = require('./model');
const { NotFoundError } = require('../../../errors');
const {StatusCodes} = require('http-status-codes')

const FindAll = async (req, res, next) => {
    try {
        const result = await Audit.find()
        .populate({
            path: 'user',
            select: '-password'
        })

        if (!result.length) {
            throw new NotFoundError('No audit found')
        }

        res.status(StatusCodes.OK).json({
            total: result.length,
            data: result,
           
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    FindAll
}