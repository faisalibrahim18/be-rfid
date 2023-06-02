const Invoice = require('../../api/v1/invoice/model');

const { NotFoundError, BadRequestError } = require('../../errors');

const createInvoice = async (req) => {
    const {  weight, } = req.body;
    const userId  = req.user.id;

    const transactionNumber = await generateUniqueTransactionNumber(17);
    const price = weight * 5000;

    const result = await Invoice.create({
        userId: userId,
        weight: weight,
        transactionNumber: transactionNumber,
        price: price
    });

    return result;
}

const getAllInvoice = async () => {
    const result = await Invoice.find()
    .populate({
        path: 'userId',
        select: 'name number_phone addres'
    })

    return result
}

const getOneInvoice = async (req) => {
    const { id } = req.params;
    const result = await Invoice.findOne({
        _id: id
    })

    if (!result) throw new NotFoundError(`not found id : ${id}`)

    return result
}

const updateInvoice = async (req) => {
    const { id } = req.params;
    const { name, weight } = req.body;

    const transactionNumber = await generateUniqueTransactionNumber(17);
    const price = weight * 5000;

    const result = await Invoice.findByIdAndUpdate(
        { _id: id },
        {
            name: name,
            weight: weight,
            transactionNumber: transactionNumber,
            price: price
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError(`not found id : ${id}`);

    return result;
}

const deleteInvoice = async (req) =>{
    const { id } = req.params;

    const result = await Invoice.findByIdAndDelete({
        _id : id
    })
    if (!result) throw new NotFoundError(`not found id : ${id}`)

    return result
}

const getInvoiceByUserId = async (req) => {
  
const userId = req.params.userId

    const result = await Invoice.find({
        userId: userId
    })
    .populate({
        path: 'userId',
        select: 'name number_phone addres'
    })

    if (!result) throw new NotFoundError(`not found id : ${id}`);

    return result;
}


async function generateUniqueTransactionNumber(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let transactionNumber = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        transactionNumber += characters.charAt(randomIndex);
    }

    const existingTransaction = await Invoice.findOne({ transactionNumber });

    if (existingTransaction) {
        return generateUniqueTransactionNumber(length);
    }

    return transactionNumber;
}



module.exports = {
    createInvoice,
    getAllInvoice,
    getOneInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceByUserId,
}