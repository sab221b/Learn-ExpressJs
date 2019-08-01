const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number },
});


mongoose.model('User', userSchema);