const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const linenSchema = Schema(
    {
        epc: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
)
const distribusiSchema = Schema(
    {

        invoice_id:{
            type: mongoose.Types.ObjectId,
            ref: 'Invoice'
        },
        customer: { 
            type: mongoose.Types.ObjectId,
            ref: 'Hospital',
            required: true
        },
      
        linen : {
            type: [linenSchema]
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
            ref: 'Tracker',
            default: String
        },
        dateIn: {
            type: Date,
            required: true
        },
        dateOut:{
            type: Date,
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
            type : String
        }
    },
    { timestamp: true }
)

module.exports = model('Distribusi', distribusiSchema)