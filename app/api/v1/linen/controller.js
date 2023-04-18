const { createLinen, getAllLinen, getOneLinen, updateLinen, deleteLinen } = require('../../../service/mongoose/linen');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try{
        const result = await createLinen(req)

        res.status(StatusCodes.CREATED).json({
            message: 'Linen created successfully',
            data: result
        })
    }catch(err){
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllLinen();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch(err){
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneLinen(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateLinen(req);

        res.status(StatusCodes.OK).json({
            message: 'Linen update successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try{
        const result = await deleteLinen(req);

        res.status(StatusCodes.OK).json({
            message: 'Linen deleted successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
    
}

module.exports = { create, index, find, update, destroy }
