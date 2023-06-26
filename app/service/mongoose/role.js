const Role = require('../../api/v1/role/model');
const { BadRequestError, NotFoundError } = require('../../errors')

const createRole = async (req) => {
  const { name, privileges } = req.body;

  const role = await Role.findOne({ name: name })

  if (role) throw new BadRequestError(`Role ${name} already exist`)

  const rolePrivileges = privileges.map((value) => ({
    privilege_id: value.id,
    allow: value.allow,
  }));

  const result = await Role.create(
    {
      name: name,
      rolePrivileges: rolePrivileges
    }
  )
  return result
}

const findAllRole = async () => {
  const result = await Role.find()
    .populate({
      path: 'rolePrivileges.privilege_id',
      select: 'name access_id',
      populate: {
        path: 'access_id',
        select: 'name'
      }
    })

  if (!result.length) throw new NotFoundError('Role not found');

  return result;
}

const getOneRole = async (req) => {
  const { id } = req.params;
  const result = await Role.findOne({
    _id: id,
  }).populate({
    path: 'rolePrivileges.privilege_id',
    select: 'name access_id',
    populate: {
      path: 'access_id',
      select: 'name'
    }
  })
  if (!result) throw new NotFoundError(`Role not found with id ${id}`);

  return result;
}

const updateRole = async (req) => {
  const { id } = req.params;
  const { name, privileges } = req.body;

  const role = await Role.findOne({ 
    name: name,
    _id: { $ne: id}
   })

  if (role) throw new BadRequestError(`Role ${name} already exist`);

  const checkId = await Role.findOne({
    _id: id,
  })

  if (!checkId) throw new NotFoundError(`Role with id ${id} not found`);

  const rolePrivileges = privileges.map((value) => ({
    privilege_id: value.id,
    allow: value.allow,
  }));

  const result = await Role.findByIdAndUpdate(
    { _id: id },
    {
      name: name,
      rolePrivileges: rolePrivileges
    },
    { new: true, runValidators: true }
  )

  return result
}

const deleteRole = async (req) => {
  const { id } = req.params;
  
  const result = await Role.findByIdAndDelete({
    _id: id,
  })

  if (!result) throw new BadRequestError(` Role With id ${id} not found`);

  return result
}

module.exports = {
  createRole,
  findAllRole,
  getOneRole,
  updateRole,
  deleteRole
}