const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/userController');
const  middleware = require('./middleware/authentication')
router.use(middleware.verify);

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/', userCtrl.createUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

//Other routes here
router.get('*', function (req, res) {
    res.send('invalid URL.');
});

module.exports = router;