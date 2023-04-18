const Distribusi = require('../../api/v1/distribusi/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkHospital } = require('./hospital');
const { checkCategory } =require('./category');
 
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

    const result = await Distribusi.create({
        customer,
        category,
        quality,
        status,
        dateIn,
        dateOut,
        amount,
    });

    return result;
}

const getAllDistribusi = async (req, res, next) => {
    const result  = await Distribusi.find()
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
        {  customer,
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

module.exports = {createDistribusi, getAllDistribusi, getOneDistribusi, updateDistribusi, deleteDistrbusi};
