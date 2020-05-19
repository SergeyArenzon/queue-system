const express = require("express");
const router = express.Router();

const authController = require("../../controller/business/auth.business-controller");
const { employeeValidator } = require("../../validator/business.validator");

router.post("/register", employeeValidator, authController.register);

router.post("/login", authController.employeeLogin);

module.exports = router;
