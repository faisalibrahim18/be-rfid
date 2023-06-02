const {
    createQuality,
    getAllQuality,
    getOneQuality,
    updateQuality,
    deleteQuality
} = require('../../../service/mongoose/quality');

const {StatusCodes} = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await getAllQuality();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await createQuality(req);

        res.status(StatusCodes.CREATED).json({
            message: 'Quality created successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneQuality(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateQuality(req);

        res.status(StatusCodes.OK).json({
            message: 'Quality updated Successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteQuality(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}
module.exports = {
    index,
    create,
    find,
    update,
    destroy,
}