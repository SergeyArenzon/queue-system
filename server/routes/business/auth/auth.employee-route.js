const router = require("express").Router();

const authController = require("../../../controller/management/auth/auth.employee-controller");

router.post("/login", authController.employeeLogin);

router.post("/register", authController.register);
module.exports = router;
