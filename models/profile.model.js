const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    dob: { type: Date, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);