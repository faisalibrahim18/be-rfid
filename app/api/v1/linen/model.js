const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        epc: { type: String, unique: true },
        category: {
            type: mongoose.Types.ObjectId,
        }
    },
    { timestamps: true }
)

module.exports = model('Linen', linenSchema)
