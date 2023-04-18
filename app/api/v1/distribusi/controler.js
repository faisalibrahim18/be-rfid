const { createDistribusi, getAllDistribusi, getOneDistribusi, updateDistribusi, deleteDistrbusi } = require('../../../service/mongoose/distribusi');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try {
    const result  = await createDistribusi(req);
    
        res.status(StatusCodes.CREATED).json({
            message: 'distribusi created successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllDistribusi()

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneDistribusi(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateDistribusi(req)

        res.status(StatusCodes.OK).json({
            message: 'distribusi update successfully',
            data: result
        })
    } catch (err){
        next(err)
    }
}


const destroy = async (req, res, next) => {
    try{
        const result = await deleteDistrbusi(req)

        res.status(StatusCodes.OK).json({
            message: 'distribusi delete successfully',
            data: result
        })
    } catch {
        next(err)
    }
}


module.exports = {
    create,
    find,
    update,
    index,
    destroy
}
