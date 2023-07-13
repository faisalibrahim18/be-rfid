const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const invoisSchema = Schema(
    {
        transactionNumber:{
            type: String,
        },
        date: {
            type: Date,
            default: new Date()
        },
        weight: {
            type: Number,
            require: [true, 'berat barang harus di isi']
        },
        price: {
            type: Number,         
        },
        hospital: {
            type: mongoose.Types.ObjectId,
            ref: 'Hospital'
        }
    },
    { 
        timestamp: true
    }
)

module.exports = model('Invois', invoisSchema);