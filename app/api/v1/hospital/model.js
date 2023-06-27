const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        epc: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const hospitalSchema  = Schema(
    {
        name: { type: String, required: [true, 'nama rumah sakit  harus di isi'], unique: true },
        number_phone: { type: Number, required: [true, 'Nomor hp rumah sakit harus di isi' ], unique: true },
        address: { type: String, required: [true, 'alamat rumah sakit harus di isi']},
        code: { type: String, required: [true, 'code harus di isi']},
        stock: {
            type: Number,
            default: 0
        },
        linen: {
            type: [linenSchema]
        }
    },
    { timestamps: true}
)

module.exports = model('Hospital', hospitalSchema);