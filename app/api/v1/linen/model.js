const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        epc: { type: String, 
            unique: true,
            required: true
         },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        code: {
            type: String,
        },
        hospital: {
            type: mongoose.Types.ObjectId,
            ref: 'Hospital'
        },
        date: {
            type: Date,
        },
        counter:{
            type: Number,
            default: 0
        }
        
    },
    { timestamps: true }
)

module.exports = model('Linen', linenSchema)
