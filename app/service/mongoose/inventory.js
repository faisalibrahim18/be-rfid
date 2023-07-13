const Inventory = require('../../api/v1/inventory/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const Audit = require('../../api/v1/audit trail/model');

const createInventory = async (req, res) => {
    const { kode, name, amount, status } = req.body;

    const checkKode = await Inventory.findOne({ kode: kode })

    if (checkKode) throw new BadRequestError(`Kode already exists`);

    const result = await Inventory.create({
        kode, name, amount, status
    })
    await Audit.create({
        task: `Inventory created ${result.name}`,
        status: 'CREATE',
        user: req.user.id
    })
    return result
}

const getAllInventory = async (req) => {
    const result = await Inventory.find()
        .select('kode name amount status')

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
    const { kode, name, amount, status } = req.body;

    const checkKode = await Inventory.findOne(
        {
            kode,
            _id: { $ne: id },
            status,
            name,
            amount
        },
    )

    if (checkKode) throw new BadRequestError(`Kode already exists`);

    const result = await Inventory.findByIdAndUpdate(
        { _id: id },
        { kode, name, amount },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError(`No such inventory found for ${id}`);

    await Audit.create({
        task: `Inventory updated ${result.name}`,
        status: 'UPDATE',
        user: req.user.id
    })
    return result
}

const deleteInventory = async (req, res) => {
    const { id } = req.params;

    const result = await Inventory.findByIdAndDelete({
        _id: id
    });

    if (!result) throw new NotFoundError(`No such inventory found for ${id}`);

    await Audit.create({
        task: `Inventory deleted ${result.name}`,
        status: 'DELETE',
        user: req.user.id
    })

    return result;
}

const countInventory = async (req, res) => {
    const result = await Inventory.find().count()

    return result;
}

module.exports = {
    createInventory,
    getAllInventory,
    getOneInventory,
    updateInventory,
    deleteInventory,
    countInventory
}