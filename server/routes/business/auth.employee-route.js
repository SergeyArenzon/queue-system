const express = require("express");
const router = express.Router();

const authController = require("../../controller/business/auth.employee-controller");
const { employeeValidator } = require("../../validator/employee.validator");

router.post("/register", employeeValidator, authController.register);

module.exports = router;
