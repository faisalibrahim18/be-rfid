const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const rolePrivilage= Schema(
  {
      privilege_id: {
          type: mongoose.Types.ObjectId,
          ref: 'Privilege',
          required: true
      },
      allow: {
          type: Boolean,
          default: false
      }
  },
  {
      timestamps: true
  }
)
const roleSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    rolePrivileges:{
      type: [rolePrivilage]
    },
  }
)

module.exports = model('Role', roleSchema);