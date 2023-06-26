const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const privilageSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        access_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Access',
            required: true
        }
    },
    {
        timestamp: true
    }
)

module.exports = model('Privilege', privilageSchema)