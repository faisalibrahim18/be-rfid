const { createHospital, getAllHospital, getOneHospital, updateHospital, deleteHospital } = require('../../../service/mongoose/hospital');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try {
        const result = await createHospital(req);

        res.status(StatusCodes.CREATED).json({
            message: 'Hospital created successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllHospital();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) =>{
    try {
        const result = await getOneHospital(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateHospital(req);

        res.status(StatusCodes.OK).json({
            message: 'Hospital updated successfully',
            data: result
        })
    }catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteHospital(req);

        res.status(StatusCodes.OK).json({
            message: 'Hospital deleted successfully',
            data: result
        })
    } catch (err){
        next(err)
    }
}

module.exports = { create, index, find, update, destroy };