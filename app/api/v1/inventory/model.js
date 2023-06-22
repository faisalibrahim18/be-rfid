const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const inventorySchema = Schema(
    {
        name: {
            type: String, 
            required: [true, 'name harus di isi']
        },
        amount: {
            type: Number, 
            required: [true, 'amount harus di isi']
        },
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true}
);

module.exports = model('Inventory', inventorySchema);