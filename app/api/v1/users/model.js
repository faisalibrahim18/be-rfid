const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcyrpt = require('bcryptjs');

const userSchema = Schema(
    {
        name: { type: String, required: [true, 'name cannot be empty']},
        username: { type: String, required: [true, 'username cannot be empty'], unique: true },
        password: { type: String, required: [true, 'password cannot be empty'], },
        email: { type: String, required: [true, 'email cannot be empty'], unique: true },
        number_phone: { type: Number, required: [true, 'number_phone cannot be'], unique: true },
        role: { type: String, enum: ['admin','user', 'superadmin', 'delivery', 'laundry'], default: 'user' }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const User = this ; 
    if (User.isModified('password')) {
        User.password = await bcyrpt.hash(User.password, 12)
    }
    next
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcyrpt.compare(candidatePassword, this.password);
    return  isMatch; 
}

module.exports = model('User', userSchema);