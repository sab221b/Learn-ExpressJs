const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    mobile: { type: Number },
});

mongoose.model('Employee', employeeSchema);