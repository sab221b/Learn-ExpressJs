const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    Employee.find((err, success) => {
        if(!err) {
            res.send(success);
        } else {
            res.send('error fetching records: ' + err)
        }
    })
});

router.post('/', (req, res) => {
    createEmployee(req, res);
});

createEmployee = function (req, res) {
    var employee = new Employee();
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.save((err, success) => {
        if (!err) {
            res.send(success);
        } else {
            res.send('error creating record: ' + err);
        }
    })
}


module.exports = router;