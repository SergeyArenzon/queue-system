const router = require("express").Router();

router.use("/auth", require("./auth.business-route"));
router.use("/service", require("./service.business-route"));

module.exports = router;
