const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    }
});

module.exports = mongoose.model('User', userSchema);