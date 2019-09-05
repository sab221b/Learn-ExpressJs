const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.createUser);

//Other routes here
router.get('*', function (req, res) {
    res.send('invalid URL.');
});

module.exports = router;