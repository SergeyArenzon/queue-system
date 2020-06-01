const router = require("express").Router();

const authController = require("../../../controller/management/auth/auth.employee-controller");

const {employeeValidator} =require('../../../validator/management/employee.validator')
router.post("/login", authController.employeeLogin);
router.get("/check/:domain", authController.check);

router.post("/register",employeeValidator, authController.register);
module.exports = router;
