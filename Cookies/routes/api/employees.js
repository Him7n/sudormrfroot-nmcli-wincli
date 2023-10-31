const express = require("express");
const { url } = require("inspector");
const router = express.Router();
const path = require("path");
const data={};

const employeeController = require('../../controllers/employeeController');

data.employees = require('../../model/employees.json');

// instead of doing router .get router.post router.put router.ddlete we can do router.route and then chain diffrent methods  for the same url


router.route('/')
 .get(employeeController.getEmployees)
 .post(employeeController.addEmployee)

.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee)


router.route('/:id')
.get(employeeController.getEmployee);
module.exports = router;