const Category = require('../../api/v1/category/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const createCategory = async (req) => {
    const { name, unit, expired  } = req.body;
    const checkName = await Category.findOne({ name: name })

    if (checkName) throw new BadRequestError(`Name Category has been created`);

    const result = await Category.create({
        name: name,
        expired: expired,
        unit: unit
    })

    return result;

}

const getAllCategory = async (req) => {

    const result = await Category.find()
        .select('name unit expired date')

    if (!result) throw new NotFoundError('Tidak ada Category');

    return result;
}

const getOneCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findOne({ _id: id })
        .select('name unit expired date')

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    return result;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name, unit, expired  } = req.body;

    const checkName = await Category.findOne({
        name,
        _id: { $ne: id }
    })
    if (checkName) throw new BadRequestError('kategori nama duplikat');

    const result = await Category.findByIdAndUpdate(
        { _id: id },
        {
            name: name,
            expired: expired,
            unit: unit
        },
        { new: true, runValidators: true }

    )

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    return result;
}

const deleteCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) throw new NotFoundError('Category not found');

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