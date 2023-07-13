const Hospital = require('../../api/v1/hospital/model');
const { NotFoundError, BadRequestError } = require('../../errors');
const Audit = require('../../api/v1/audit trail/model');

const createHospital = async (req, res, next) => {
    const {
        code,
        name,
        number_phone,
        address,    
    } = req.body;

    const checkName = await Hospital.findOne({ name: name });

    if (checkName) throw new BadRequestError('name has been registered already');

    const checkNumberPhone = await Hospital.findOne({ number_phone: number_phone });

    if (checkNumberPhone) throw new BadRequestError('number_phone has been registered');

    const result = await Hospital.create({
        name,
        code,
        number_phone,
        address,
    });

    await Audit.create({
        task: `Hospital created ${result.name}`,
        status: 'CREATE',
        user: req.user.id
    })

    return result
}

const getAllHospital = async (req, res, next) => {

    const result = await Hospital.find()
       
    if (!result) throw new NotFoundError('Hospital Not Found');

    return result;
}

const getOneHospital = async (req, res, next) => {
    const { id } = req.params;
    const result = await Hospital.findOne({ _id: id })
        .select(
            '_id code name  number_phone  address '
        )
    if (!result) throw new NotFoundError('Hospital Not Found');
    return result;
}

const updateHospital = async (req, res, next) => {
    const { id } = req.params;
    const {
        name,
        code,
        number_phone,
        address,
    } = req.body

    const checkName = await Hospital.findOne({
        name,
        _id: { $ne: id },
    })
    if (checkName) throw new BadRequestError('name has been registered');

    const checkNumberPhone = await Hospital.findOne({
        number_phone,
        _id: { $ne: id },
    })
    if (checkNumberPhone) throw new BadRequestError('number phone has been registered');

    const result = await Hospital.findByIdAndUpdate(
        { _id: id },
        {
            name,
            code,
            number_phone,
            address,
        },
        { new: true, runValidators: true }
    );
    if (!result) throw new NotFoundError('Hospital not found');

    await Audit.create({
        task: `Hospital updated ${result.name}`,
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const deleteHospital = async (req) => {
    const { id } = req.params;

    const result = await Hospital.findByIdAndDelete(id);

    if (!result) throw new NotFoundError('Hospital not found');

    await Audit.create({
        task: `Hospital deleted ${result.name}`,
        status: 'DELETE',
        user: req.user.id
    })

    return result;
}

const checkHospital = async (id) => {

    const result = await Hospital.findOne({ _id: id })
    if (!result) throw new NotFoundError('Hospital not found');
    
    return result;
}

const countHospital = async (req) => {
    const result = await Hospital.find().count()

    return result;
}

module.exports = { createHospital, getAllHospital, getOneHospital, updateHospital, deleteHospital, checkHospital, countHospital }