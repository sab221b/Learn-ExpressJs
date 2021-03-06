const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    if (req.query) {
        console.log(req.query);
        var query = req.query;
        User.find((query), (err, response) => {
            if (!err) {
                res.send(response);
            } else {
                res.send('error fetching records: ' + err);
            }
        });
    } else {
        User.find((err, response) => {
            if (!err) {
                res.send(response);
            } else {
                res.send('error fetching records: ' + err)
            }
        });
    }
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, response) => {
        if (response) {
            response.populate('profile').execPopulate((err, data) => {
                if(data) res.send(data);
                else res.send(err);
            });
        } else {
            res.send('error fetching data: ' + err);
        }
    })
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, response) => {
        if (!err) {
            res.send(response);
        } else {
            res.send('error in updating record: ' + err);
        }
    });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, response) => {
        if (!err) {
            if (response) {
                res.send({ message: 'deleted user' });
            } else res.send({ message: 'Not Found' });
        } else {
            res.send({ message: 'error deleting user' })
        }
    })
};

exports.createUser = (req, res) => {
    if (req.body.firstname && req.body.lastname && req.body.dob && req.body.email && req.body.mobile) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        User.find({ email: user.email }, (err, success) => {
            if (success.length) {
                res.send({ message: "username already exists!" })
            } else if (!success.length && !err && user.password) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (!err && hash) {
                            var profile = new Profile();
                            profile.firstname = req.body.firstname;
                            profile.lastname = req.body.lastname;
                            profile.gender = req.body.gender;
                            profile.dob = req.body.dob;
                            profile.save((err, response) => {
                                if (response) {
                                    user.password = hash;
                                    user.profile = profile._id;
                                    user.save((err, response) => {
                                        if (response) {
                                            response.populate('profile').execPopulate((err, data) => {
                                                if(data) res.send(data);
                                                else res.send(err);
                                            })
                                        } else {
                                            res.send('error creating user: ' + err);
                                        }
                                    });
                                } else {
                                    res.send('error creating profile: ' + err);
                                }
                            });
                        } else {
                            res.send(err);
                        }
                    });
                });
            }
        })
    }
}
