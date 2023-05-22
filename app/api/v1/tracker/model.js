const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const chekingSchema = Schema(
    {
        name: { 
            type: String, 
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        no_hp: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
        }
    }
)

const transitSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        no_hp: {
            type: String,
            required: true
        },
        vehicle: {
            type: String,
            required: true,
        },
        license: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
        }
    }
)

const acceptSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        no_hp: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true,
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
        }
    }
)

const washSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        no_hp: {
            type: String,
            required: true
        },
        amount:{ 
            type: String,
            required: true
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        }
    }
)
const drySchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        no_hp: {
            type: String,
            required: true
        },
        amount:{ 
            type: String,
            required: true
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        }
    }
)

const doneSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        no_hp: {
            type: String,
            required: true
        },
        amount:{ 
            type: String,
            required: true
        },
        heavy: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        }
    }
)

const trackingSchema = Schema(
    {
        status: {
            type: String,    
        },
        checking: {
            type: chekingSchema,
    
        },
        transit: {
            type: transitSchema, 
        },
        accepted: { 
            type: acceptSchema,
        },
        wash: {
            type: washSchema,
        },
        dry: {
            type: drySchema,
        }, 
        done: {
            type: doneSchema,
        }
    },
    { timestamp: true}
)

module.exports = model('Tracker', trackingSchema);