const Distribusi = require('../../api/v1/distribusi/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkHospital } = require('./hospital');
const { checkCategory } =require('./category');
const { checkStatus } = require('./tracker');
 
const createDistribusi = async (req, res, next) => {
    const { 
        customer,
        category,
        quality,
        status,
        dateIn,
        dateOut,
        amount,
    } = req.body;

    await checkCategory(category);
    await checkHospital(customer);
    await checkStatus(status);

    const result = await Distribusi.create({
        customer,
        category,
        quality,
        status ,
        dateIn,
        dateOut,
        amount,
    });

    return result;
}

const getAllDistribusi = async (req, res, next) => {
    const { dateIn, dateOut } = req.query;
    let condition = {};

    if (dateIn) {
        condition = { ...condition, dateIn: dateIn }
    }
    if (dateOut) {
        condition = { ...condition, dateOut: dateOut }
    }

    const result  = await Distribusi.find(condition)
    .populate({
        path: 'customer',
        select: '_id name email number_phone service address postcode pick_up delivery notes'

    })
    .populate({
        path: 'category',
        select: 'id name'
    })
    .populate({
        path: 'status',
        select: 'status checking transit accepted wash dry done'
    })
    .select('customer category quality status dateIn dateOut amount')

    if (!result) throw new NotFoundError('Distribusi Not Found')

    return result
}

const getOneDistribusi = async (req, res, next) => {
    const { id } = req.params;

    const result = await Distribusi.findOne({ _id: id})
    .select('customer category quality status dateIn dateOut amount')

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const updateDistribusi = async (req, res, next) => {
    const { id } = req.params;
    const { 
        customer,
        category,
        quality,
        status,
        dateIn,
        dateOut,
        amount,
    } = req.body;

    const result = await Distribusi.findByIdAndUpdate(
        { _id: id },
        {  
            customer,
            category,
            quality,
            status,
            dateIn,
            dateOut,
            amount,
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Distribusi id Not Found')
    
    return result
}

const deleteDistrbusi = async (req, res, next) => {
    const { id } = req.params;

    const result =  await Distribusi.findByIdAndDelete({ _id: id})
    
    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const downloadDistribusi = async (req, res, next) => {
    
}

module.exports = {createDistribusi, getAllDistribusi, getOneDistribusi, updateDistribusi, deleteDistrbusi, downloadDistribusi};
