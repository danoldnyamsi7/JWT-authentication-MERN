const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 12,
        max: 255,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;