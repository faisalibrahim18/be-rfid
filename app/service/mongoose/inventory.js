const Inventory = require('../../api/v1/inventory/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createInventory = async (req, res) => {
    const { kode, name, amount } = req.body;

    const checkKode = await Inventory.findOne({ kode: kode })

    if (checkKode) throw new BadRequestError(`Kode already exists`);

    const result = await Inventory.create({
        kode, name, amount
    })

    return result
}

const getAllInventory = async (req) => {
    const result = await Inventory.find()
        .select('kode name amount')

    if (!result) throw new NotFoundError('Inventory not found');

    return result;
}

const getOneInventory = async (req) => {
    const { id } = req.params;

    const result = await Inventory.findOne({ _id: id })
        .select('kode name amount')

    if (!result) throw new NotFoundError(`No such inventory found for ${id}`);

    return result;
}

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const { kode, name, amount } = req.body;

    const checkKode = await Inventory.findOne(
        {
            kode,
            _id: { $ne: id }
        },
    )

    if (checkKode) throw new BadRequestError(`Kode already exists`);

    const result = await Inventory.findByIdAndUpdate(
        { _id: id },
        { kode, name, amount },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError(`No such inventory found for ${id}`);

    return result
}

const deleteInventory = async (req, res) => {
    const { id } = req.params;

    const result = await Inventory.findByIdAndDelete({
        _id: id
    });

    if (!result) throw new NotFoundError(`No such inventory found for ${id}`);

    return result;
}

module.exports = {
    createInventory,
    getAllInventory,
    getOneInventory,
    updateInventory,
    deleteInventory
}