const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const qualitySchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'quality harus di isi']
        }
    },
    { timestamps: true}
)

module.exports = model('quality', qualitySchema);
