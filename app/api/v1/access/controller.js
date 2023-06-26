const {
    createAccess,
    findAllAccess,
} = require('../../../service/mongoose/access');
const {StatusCodes} = require('http-status-codes')

const create = async (req, res, next) => {
    try{
        const result = await createAccess(req)

        res.status(StatusCodes.CREATED).send({
            message: 'create access successfully',
            data: result
        })
    } catch (err) {
        next (err)
    }
}

const find = async (req, res, next) => {
    try{
        const result = await findAllAccess()

        res.status(StatusCodes.OK).send({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    create,
    find
}