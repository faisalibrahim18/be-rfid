const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const invoisSchema = Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref : 'User',
            required: [true, 'id user not found']
        },  
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
        }
    }
)

module.exports = model('Invois', invoisSchema);