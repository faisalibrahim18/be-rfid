const Access = require('../../api/v1/access/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const createAccess = async (req) => {
    const { name } = req.body;
    
    const result = await Access.create({
        name: name
    })

    return result
}

const findAllAccess = async () => {
    const result = await Access.find()


    if (!result.length) throw new NotFoundError('Access not found')

    return result;
}

module.exports = {
    createAccess,
    findAllAccess
}