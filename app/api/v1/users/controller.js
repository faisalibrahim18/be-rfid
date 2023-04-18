const Users = require('./model');
const { StatusCodes } = require('http-status-codes');

const { createUser, getAllUser, getOneUsers, updateUser, deleteUser } = require('../../../service/mongoose/user')

const create = async (req, res, next) => {
    try {
        const result = await createUser(req);

        res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            data: result
        }) 

    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllUser();

        res.status(StatusCodes.OK).json({
            data: result
        })
    }catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try{
        const result = await getOneUsers(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    }catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try{
        const result = await updateUser(req);

        res.status(StatusCodes.OK).json({
            message: 'updated successfully',
            data: result
        })
    } catch (err){
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try{
        const result = await deleteUser(req);

        res.status(StatusCodes.OK).json({
            message: 'delete successfully',
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