const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const auditTrail = Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        task: {
            type: String,
        },
        status: {
            type: String,
        },
        date: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamp: true
    }
)

module.exports = model('Audit', auditTrail);