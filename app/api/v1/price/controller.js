const {
    findOnePrice,
    getAllPrice,
    createPrice,
    updatePrice,
    deletePrice
} = require('../../../service/mongoose/price');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try {
        const result = await createPrice(req);

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllPrice();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await findOnePrice(req)

        res.status(StatusCodes.OK).json({
            data: result,
        })
    
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {

        const result = await updatePrice(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deletePrice(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    create,
    index,
    find,
    update,
    destroy
}