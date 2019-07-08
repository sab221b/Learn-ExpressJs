const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    Employee.find((err, success) => {
        if (!err) {
            res.send(success);
        } else {
            res.send('error fetching records: ' + err)
        }
    });
});

router.post('/', (req, res) => {
    createEmployee(req, res);
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, success) => {
        if(!err) {
            res.send(success);
        } else {
            res.send('error fetching data: ' + err);
        }
    })
})

router.put('/:id', (req, res) => {
    Employee.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, success) => {
        if(!err) {
            res.send(success);
        } else {
            res.send('error in updating record: ' + err);
        }
    });
});

router.delete('/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, success) => {
        if(!err) {
            res.send({ status: 'ok'});
        } else {
            res.send('error in deleting record: ' + err);
        }
    })
})

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