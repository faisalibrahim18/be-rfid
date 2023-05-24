const { response } = require('express');
const { createLinen,
    getAllLinen,
    getOneLinen,
    updateLinen,
    deleteLinen,
    countLinen,
    importExcelLinen
} = require('../../../service/mongoose/linen');
const { StatusCodes } = require('http-status-codes');
const xlsx = require('xlsx');

const Linen = require('./model')

const create = async (req, res, next) => {
    try {
        const result = await createLinen(req)

        res.status(StatusCodes.CREATED).json({
            message: 'Linen created successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllLinen();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
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
    try {
        const result = await deleteLinen(req);

        res.status(StatusCodes.OK).json({
            message: 'Linen deleted successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }

}

const count = async (req, res, next) => {
    try {
        const result = await countLinen()

        res.json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const importExcel = async (req, res, next) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        for (const item of jsonData) {
            const existingLinen = await Linen.findOne({ epc: item.EPC });
            if (existingLinen) {
                return res.send({ message: 'Duplicate EPC' });
            }
        }

        const transformedData = jsonData.map((item) => {
            const transformedItem = {
                epc: item.EPC,
            }

            return transformedItem
        })



        await Linen.create(transformedData)

        res.send({ status: StatusCodes.OK, message: true })
    } catch (err) {
        res.send({ status: StatusCodes.INTERNAL_SERVER_ERROR, success: false, message: err.message });
    }
}
module.exports = { create, index, find, update, destroy, count, importExcel }
