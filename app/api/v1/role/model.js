const mongoose = require('mongoose');
const { model, Schema} = mongoose;

const roleSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        permission: {
            createUser: Boolean,
        }
    }
)