const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const distribusiSchema = Schema(
    {
        customer: { 
            type: mongoose.Types.ObjectId,
            ref: 'Hospital',
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        linen : {
            type: mongoose.Types.ObjectId,
            ref: 'Linen',
            required: true
        },
        service :{
            type: String,
            required: true
        },
        quality: {
            type: String,
            required: true
        },
        status: {
            type: mongoose.Types.ObjectId,
            ref: 'Tracker'
        },
        dateIn: {
            type: Date,
            required: true
        },
        dateOut:{
            type: Date,
            required: true
        },
        amount: {
            type:Number,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        note : {
            type : String,
            required: true
        }
    },
    { timestamp: true }
)

module.exports = model('Distribusi', distribusiSchema)