const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const accessSchema   = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamp: true
    }
)

module.exports = model('Access', accessSchema)


