const router = require("express").Router();

router.use("/auth", require("./auth/login-register.auth.employee-business-route"));
router.use("/details", require("./details/details.business-route"));
router.use("/service", require("./service/service.business-route"));



module.exports = router;
