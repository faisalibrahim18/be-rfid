const mongoose = require('mongoose');
const { model, Schema} = mongoose;

const categorySchema = Schema(
    {
        name: { type: String, required: [true, 'Nama tidak boleh kosong'], unique: true },
    },
    { timestamps: true }
);

module.exports = model('Category', categorySchema);
