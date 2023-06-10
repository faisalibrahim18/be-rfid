const Distribusi = require('../../api/v1/distribusi/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkHospital } = require('./hospital');
const { checkCategory } = require('./category');
const { checkStatus } = require('./tracker');
const { checkLinen } = require('./linen');
const Linen = require('../../api/v1/linen/model')
const xlsx = require('xlsx');



const createDistribusi = async (req, res, next) => {
    const {
        customer,
        quality,
        service,
        dateIn,
        dateOut,
        weight,
        note
    } = req.body;


    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = jsonData.map(async (item) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            })

        if (Category) {
            item.category = Category.category.name;
        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })
    const transformedformis = await Promise.all(transformedData);


    const result = await Distribusi.create({
        customer,
        quality,
        linen: transformedformis,
        service,
        dateIn,
        dateOut,
        amount: count,
        weight,
        note,
        status: null
    });

    return result;
}

const getAllDistribusi = async (req, res, next) => {
    const { dateIn, dateOut } = req.query;
    let condition = {};

    if (dateIn) {
        condition.dateIn = { $gte: new Date(dateIn) };
    }
    if (dateOut) {
        condition.dateOut = { $lte: new Date(dateOut) };
    }


    const result = await Distribusi.find(condition)
        .populate({
            path: 'customer',
            select: '_id name  number_phone  address'

        })
        .populate({
            path: 'category',
            select: 'id name'
        })
        .populate({
            path: 'linen',
            select: 'epc category date'
        })
        .populate({
            path: 'status',
            select: 'status checking transit accepted wash dry done'
        })
        .select('customer category linen quality service status dateIn dateOut amount weight note')

    if (!result) throw new NotFoundError('Distribusi Not Found')

    return result
}

const getOneDistribusi = async (req, res, next) => {
    const { id } = req.params;

    const result = await Distribusi.findOne({ _id: id })
        .select('customer category linen quality service status dateIn dateOut amount weight note')

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const updateDistribusi = async (req, res, next) => {
    const { id } = req.params;
    const {
        customer,
        category,
        linen,
        service,
        quality,
        status,
        dateIn,
        dateOut,
        amount,
        weight,
        note
    } = req.body;


    const result = await Distribusi.findByIdAndUpdate(
        { _id: id },
        {
            customer,
            category,
            quality,
            linen,
            service,
            status,
            dateIn,
            dateOut,
            amount,
            weight,
            note
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const   deleteDistrbusi = async (req, res, next) => {
    const { id } = req.params;

    const result = await Distribusi.findByIdAndDelete({ _id: id })

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const countDistrbusi = async (req, res, next) => {
    const result = await Distribusi.find().count()

    return result;
}

module.exports = { createDistribusi, getAllDistribusi, getOneDistribusi, updateDistribusi, deleteDistrbusi, countDistrbusi  };
