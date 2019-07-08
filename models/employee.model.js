const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number },
});

mongoose.model('Employee', employeeSchema);