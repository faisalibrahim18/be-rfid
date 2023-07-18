const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const linenSchema = Schema(
    {
        epc: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
)

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
        },
        date: {
            type: Date,
            default: new Date()
        },
        linen: {
            type: [linenSchema]
        },
        notif:{
            type: String,
        }
    },
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
        },
        date: {
            type: Date,
            default: new Date()
        }
    },
    { timestamps: true }
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
        },
        date: {
            type: Date,
            default: new Date()
        },
        linen: {
            type: [linenSchema]
        }
        ,
        notif:{
            type: String,
        }
    },
    { timestamps: true }
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
        },
        date: {
            type: Date,
            default: new Date()
        },
        linen: {
            type: [linenSchema]
        }
        ,
        notif:{
            type: String,
        }
    },
    { timestamps: true }
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
        },
        date: {
            type: Date,
            default: new Date()
        },
        linen: {
            type: [linenSchema]
        }
        ,
        notif:{
            type: String,
        }
    },
    { timestamps: true }
)

const returnSchema = Schema(
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
        },
        date: {
            type: Date,
            default: new Date()
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
        },
        date: {
            type: Date,
            default: new Date()
        },
        linen: {
            type: [linenSchema]
        }
        ,
        notif:{
            type: String,
        }
    },
    { timestamps: true }
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
        returned: {
            type: returnSchema
        },
        done: {
            type: doneSchema,
        },
        
    },
    { timestamps: true }
)

module.exports = model('Tracker', trackingSchema);