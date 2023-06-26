const {
    createRole,
    findAllRole,
    getOneRole,
    updateRole,
    deleteRole
} = require('../../../service/mongoose/role');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await findAllRole()

        res.status(StatusCodes.OK).send({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const result = await createRole(req);

        res.status(StatusCodes.CREATED).send({
            message: 'create role successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneRole(req);

        res.status(StatusCodes.OK).send({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateRole(req);

        res.status(StatusCodes.OK).send({
            message: 'update role successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteRole(req);

        return res.status(StatusCodes.OK).send({
            message: 'delete role successfully',
            data: result
        })
    } catch (err){
        next(err)
    }
}

module.exports = {
    index,
    create,
    find,
    update,
    destroy
}