const router = require("express").Router();

router.use("/auth", require("./auth/auth.employee-route"));

module.exports = router;
