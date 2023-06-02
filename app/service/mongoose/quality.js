const Quality = require('../../api/v1/quality/model');
const { BadRequestError,  } = require('../../errors')

const createQuality = async (req) => {
    const { name } = req.body;

    const result = await Quality.create({
        name: name,

    })

    return result
}

const getAllQuality = async () => {
    const result = await Quality.find()
    .select('name')

    if (!result) throw new NotFoundError('Quality not found');

    return result;
}

const getOneQuality = async (req) => {
    const { id } = req.params;

    const result = await Quality.findOne({ _id: id})
    .select('name')

    if (!result) throw new NotFoundError('Quality not found');

    return result;
}

const updateQuality = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Quality.findByIdAndUpdate(
        {_id: id},
        { name },
        { new: true, runValidators: true}
    )
    if (!result) throw new BadRequestError(`Quality for id ${id} not found`);

    return result;
}

const deleteQuality = async (req) => {
    const { id } = req.params;
    const result = await Quality.findByIdAndDelete({ _id: id})

    if (!result) throw new BadRequestError(`Quality for id ${id} not found`);

    return result;
}

module.exports = {
    createQuality,
    getAllQuality,
    getOneQuality,
    updateQuality,
    deleteQuality
}