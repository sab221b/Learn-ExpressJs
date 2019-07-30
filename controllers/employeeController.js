const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

exports.getEmployees = (req, res) => {
    if (req.query) {
        console.log(req.query);
        var query = req.query;
        Employee.find((query), (err, response) => {
            if (!err) {
                res.send(response);
            } else {
                res.send('error fetching records: ' + err);
            }
        });
    } else {
        Employee.find((err, response) => {
            if (!err) {
                res.send(response);
            } else {
                res.send('error fetching records: ' + err)
            }
        });
    }
};

exports.getEmployeeById = (req, res) => {
    Employee.findById(req.params.id, (err, response) => {
        if (!err) {
            res.send(response);
        } else {
            res.send('error fetching data: ' + err);
        }
    })
};

exports.updateEmployee = (req, res) => {
    Employee.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, response) => {
        if (!err) {
            res.send(response);
        } else {
            res.send('error in updating record: ' + err);
        }
    });
};

exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, response) => {
        if (!err) {
            if (response) {
                res.send({ message: 'deleted employee' });
            } else res.send({ message: 'Not Found' });
        } else {
            res.send({ message: 'error deleting record' })
        }
    })
};

exports.createEmployee = (req, res) => {
    var employee = new Employee();
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.save((err, response) => {
        if (!err) {
            res.send(response);
        } else {
            res.send('error creating record: ' + err);
        }
    })
}
