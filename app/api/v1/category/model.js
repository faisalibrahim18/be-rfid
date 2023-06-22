const mongoose = require('mongoose');
const { model, Schema} = mongoose;

const categorySchema = Schema(
    {
        name: { type: String, required: [true, 'Nama tidak boleh kosong'], unique: true },
        date: {
            type: Date,
            required: true,
            default: new Date()
        },
        expired: {
            type: Date,
            required: true,
        },
        unit : {
            type: String,
            required: true
        },
      
    },
    { timestamps: true }
);

module.exports = model('Category', categorySchema);
