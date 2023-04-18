const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const hospitalSchema  = Schema(
    {
        name: { type: String, required: [true, 'nama rumah sakit  harus di isi'], unique: true },
        email: { type: String, required: [true, 'email rumah sakit harus di isi'], unique: true },
        number_phone: { type: Number, required: [true, 'Nomor hp rumah sakit harus di isi' ], unique: true },
        service: { type: String, required: [true, 'Service harus di isi']},
        address: { type: String, required: [true, 'alamat rumah sakit harus di isi']},
        postcode: { type: String, required: [true, 'postcode rumah sakit harus di isi']},
        pick_up: { type: Date, required: [true, 'pick up date harus di isi']},
        delivery: { type: Date, required: [true, 'delivery date harus di isi']},
        notes: { type: String}
    },
    { timestamps: true}
)

module.exports = model('Hospital', hospitalSchema);