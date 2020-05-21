const router = require("express").Router();

const Business = require("../../models/business.model");
const Service = require("../../models/service.model");

router.use("/auth", require("./auth.employee-route"));
router.use("/service", require("./service.business-route"));
router.use("/details", require("./details.business-route"));

router.get("/", async (req, res, next) => {
  try {
    const business = await Business.findOne();
    const services = await Service.find();

    res.status(201).json({
      msg: "all the business",
      services,
      business,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
