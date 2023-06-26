const Privilege = require('../../api/v1/privilege/model');
const { BadRequestError, NotFoundError } = require('../../errors');


const createPrivilege = async (req) => {
    const { name, access } = req.body;

    const privilege = await Privilege.findOne({ name });

    if (privilege) throw new BadRequestError(`Privilage ${name} already exist`)

    const result = await Privilege.create({
        name: name,
        access_id: access
    })

    return result ;
}

const findAllPrivilege = async (req) => {
    const result = await Privilege.find().
    populate({
        path: 'access_id',
    })

    if (!result.length) throw new NotFoundError('Privilege not found');

    return result;
} 


module.exports = {
    createPrivilege,
    findAllPrivilege
}