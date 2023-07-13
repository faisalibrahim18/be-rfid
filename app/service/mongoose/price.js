const Price = require('../../api/v1/price/model');
const { NotFoundError, BadRequestError } = require('../../errors')


const getAllPrice = async (req, res, next) => {
    const price = await Price.find()


    return price

}

const createPrice = async (req, res, next) => {
    const { value, name } = req.body;

    const price = await Price.create({
        value,
        name
    })

    return price
}

const findOnePrice = async (req, res, next) => {
    const { id } = req.params;

    const price = await Price.findOne({ _id:id })

    return price
}

const updatePrice = async (req, res, next) => {
    const { id } = req.params;
    const { value } = req.body;
    const price = await Price.findByIdAndUpdate(
        { _id : id },
        {
            value
        },
        { new: true }
    )

    return price;
}


const deletePrice = async (req, res, next) => {
    const { id } = req.params;
    
    const price = await Price.findOne({ _id: id });

    if (price.name === 'Harga Cuci Per KG'){
        throw new BadRequestError('tidak bisa di hapus')
    }

    price.destroy()
}


module.exports = {
    getAllPrice,
    createPrice,
    findOnePrice,
    updatePrice,
    deletePrice,
}