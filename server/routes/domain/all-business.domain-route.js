const router = require("express").Router();

const Business = require("../../models/business-details.model");
const Service = require("../../models/service.model");

router.get("/", async (req, res, next) => {
  try {
    const business = await Business(req.mongo).findOne();
    const services = await Service(req.mongo).find();

    res.status(201).json({
      msg: "all the business",
      services,
      business,
      // employee: req.employee,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
