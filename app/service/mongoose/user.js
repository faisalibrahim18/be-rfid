const User = require('../../api/v1/users/model');
const bcrypt = require('bcryptjs');
const { BadRequestError, NotFoundError } = require('../../errors');

const createUser = async (req, res, next) => {
    const {
        name,
        username,
        password,
        confirmPassword,
        email,
        number_phone,
        role,
    } = req.body

    const checkUsername = await User.findOne({ username: username });

    if (checkUsername) throw new BadRequestError('Username has been registered already');

    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) throw new BadRequestError('email has been registered');

    if (password !== confirmPassword) throw new BadRequestError('password does not match with confirmation password')

    const checkNumberPhone = await User.findOne({ number_phone: number_phone });

    if (checkNumberPhone) throw new BadRequestError('number_phone has been registered');

    

    const result = await User.create({
        name,
        username,
        password,
        email,
        number_phone,
        role
    })

    return result; 
}

const getAllUser = async (req) =>{
    const result = await User.find()
    .select('_id name username role email number_phone')

    console.log(req.user.name)

    return result;
}

const getOneUsers = async (req) => {
    const { id } = req.params;

    const result = await User.findOne({ _id: id})
    .select('_id name username role email number_phone')

    if (!result) throw new NotFoundError(`user not found for ${id}`)

    return result;
}

const updateUser = async (req) => {
    const { id } = req.params;
    const {
        name,
        username,
        password,
        email,
        number_phone,
        role 
    } = req.body;

    const checkUsername = await User.findOne({
        username,
        _id: { $ne: id },
    })
    if (checkUsername) throw new BadRequestError('username has been registered');

    const checkEmail = await User.findOne({
        email,
        _id : { $ne: id }, 
    })

    if (checkEmail) throw new BadRequestError('email has been registered');

    const checkNumberPhone = await User.findOne({
        number_phone,
        _id : { $ne: id },
    })

    if (checkNumberPhone) throw new BadRequestError('number phone has been registered');

    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.findByIdAndUpdate(
        { _id: id },
        { name, username, password: hashedPassword, email, number_phone, role},
        { new: true, runValidators: true }
    );
    if (!result) throw new NotFoundError('User Not Found');

    return result;
}

const deleteUser = async (req) => {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) throw new NotFoundError(`user not found for id ${id}`);

    return result;
}

const getUserLogin = async (req) => {
    const result = await User.findOne({ id: req.params.id });
    
    return result;
}

module.exports = {
    createUser,
    getAllUser,
    getOneUsers,
    updateUser,
    deleteUser,
    getUserLogin
}