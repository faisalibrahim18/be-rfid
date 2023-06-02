const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        epc: { type: String, unique: true },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        quality: {
            type: mongoose.Types.ObjectId,
            ref: 'Quality',
            // required: [true, 'kualitas harus di isi']
        },
        // customer: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'Hospital',
        //     required: [true, 'Customer Harus di isi']
        // },  
        date: {
            type: Date,
        }
    },
    { timestamps: true }
)

module.exports = model('Linen', linenSchema)
