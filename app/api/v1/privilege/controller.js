const {
    createPrivilege,
    findAllPrivilege
} = require('../../../service/mongoose/privilege');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try{ 
        const result = await createPrivilege(req);

        res.status(StatusCodes.CREATED).send({
            message: 'create privilege successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }    
}

const index = async (req, res, next) => {
    try {
        const result = await findAllPrivilege()

        res.status(StatusCodes.OK).send({
            data: result
        })
    } catch (err){
        next(err)
    }
}

module.exports = {
    create,
    index
}
