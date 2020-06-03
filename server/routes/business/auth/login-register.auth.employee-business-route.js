const router = require("express").Router();

const authController = require("../../../controller/auth/business/auth.employee-controller");

const { employeeValidator } = require('../../../validator/business/employee.validator');

router.post("/login", authController.employeeLogin);

router.get("/check/:domain", authController.check);

router.post("/register", employeeValidator, authController.register);
module.exports = router;
