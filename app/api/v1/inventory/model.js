const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const inventorySchema = Schema(
    {
        kode: {type: String, required: [true, 'kode inventory harus di isi'], unique: true},
        name: {type: String, required: [true, 'name harus di isi']},
        amount: {type: Number, required: [true, 'amount harus di isi' ]}
    },
    { timestamps: true}
);

module.exports = model('Inventory', inventorySchema);