const { createInventory, getAllInventory, getOneInventory, updateInventory, deleteInventory, countInventory } = require('../../../service/mongoose/inventory');
const { StatusCodes } = require('http-status-codes');

const create  = async (req, res, next) => {
    try {
        const result = await createInventory(req);

        res.status(StatusCodes.CREATED).json({
            message: 'data Created successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllInventory()
        
        res.status(StatusCodes.OK).json({
            total: result.length,
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try{
        const result = await getOneInventory(req)

        res.status(StatusCodes.OK).json({
            data: result 
        })
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateInventory(req)
        
        res.status(StatusCodes.OK).json({
            message: 'Updated Inventory successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try{
        const result = await deleteInventory(req)

        res.status(StatusCodes.OK).json({
            message: 'delete invetory successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const count = async (req, res, next) => {
    try {
        const result = await countInventory();

        res.json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { create, index, find, update, destroy, count };