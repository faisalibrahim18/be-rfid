const { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory, countCategory } = require('../../../service/mongoose/category');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try {
        const result = await createCategory(req);

        res.status(StatusCodes.CREATED).json({
            message: 'Category created successfully',
            data: result
        })

    }catch (err){
        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        const result = await getAllCategory();

        res.status(StatusCodes.OK).json({
            data: result
        })
    }catch (err){
        next(err);
    }
}

const find = async (req, res, next) => {
    try{
        const result = await getOneCategory(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    }catch (err){
        next(err);
    }
}

const update = async (req, res, next) => {
    const result = await updateCategory(req);

    res.status(StatusCodes.OK).json({
        message: 'update category successfully',
        data: result
    })
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteCategory(req);

        res.status(StatusCodes.OK).json({
            message: 'Delete category successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const count = async (req, res, next)=>{
    try {
        const result = await countCategory();

        res.json({ data: result });
    } catch (err) {
        next(err);
    }
}

module.exports = { create, index, find, update, destroy, count}
