const router = require("express").Router();

router.use("/service", require("./service.business-route"));
router.use("/details", require("./details.business-route"));

router.use("/", require("./all-business.domain-route"));

module.exports = router;
