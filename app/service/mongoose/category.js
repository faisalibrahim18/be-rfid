const Category = require('../../api/v1/category/model');
const { NotFoundError, BadRequestError } = require('../../errors');
const Audit = require('../../api/v1/audit trail/model');

const createCategory = async (req) => {
    const { name, unit} = req.body;
    const checkName = await Category.findOne({ name: name })

    if (checkName) throw new BadRequestError(`Name Category has been created`);

    const result = await Category.create({
        name: name,
        unit: unit
    })

    await Audit.create({
        task: `Category created ${result.name}`,
        status: 'CREATE',
        user: req.user.id
    })

    return result;

}

const getAllCategory = async (req) => {

    const result = await Category.find()
        .select('name unit date')

    if (!result) throw new NotFoundError('Tidak ada Category');

    return result;
}

const getOneCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findOne({ _id: id })
        .select('name unit date')

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    return result;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name, unit } = req.body;

    const checkName = await Category.findOne({
        name,
        _id: { $ne: id }
    })
    if (checkName) throw new BadRequestError('kategori nama duplikat');

    const result = await Category.findByIdAndUpdate(
        { _id: id },
        {
            name: name,
            unit: unit
        },
        { new: true, runValidators: true }

    )

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    await Audit.create({
        task: `Category updated ${result.name}`,
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const deleteCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) throw new NotFoundError('Category not found');

    await Audit.create({
        task: `Category deleted ${result.name}`,
        status: 'DELETE',
        user: req.user.id
    })

    return result;
}

const checkCategory = async (id) => {
    const result = await Category.findOne({ _id: id })

    if (!result) throw new NotFoundError('Category id not found');
    
    return result
}

const countCategory = async () => {
    const result = await Category.find().count();

    return result;
}

module.exports = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    checkCategory,
    countCategory
}