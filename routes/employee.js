const express = require("express");
const router = express.Router();
const employeeCtrl = require('../controllers/employeeController');

router.get('/', employeeCtrl.getEmployees);
router.get('/:id', employeeCtrl.getEmployeeById);
router.post('/', employeeCtrl.createEmployee);
router.put('/:id', employeeCtrl.updateEmployee);
router.delete('/:id', employeeCtrl.deleteEmployee);

module.exports = router;