const { INSUFFICIENT_SPACE_ON_RESOURCE } = require('http-status-codes');
const mongoose = require('mongoose');
const { model, Schema } = mongoose

const priceSchema = Schema(
    {
        name: {
            type: String,
        },
        value: {
            type: Number,
            required: true,
        }
    },
    {
        timestamp: true
    }
)

module.exports = model('Price', priceSchema)