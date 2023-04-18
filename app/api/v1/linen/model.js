const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        name: { type: String, required: [true, 'nama linen harus diisi'], unique: true }
    },
    { timestamps: true }
)

module.exports = model('Linen', linenSchema)
