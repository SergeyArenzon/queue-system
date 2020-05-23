module.exports = () => {
  const router = require("express").Router();

  const Business = require("../../models/business.model");
  const Service = require("../../models/service.model");

  router.use("/auth", require("./auth.employee-route"));
  router.use("/service", require("./service.business-route"));
  router.use("/details", require("./details.business-route"));

  router.get("/", async (req, res, next) => {
    try {
      const business = await Business(req.mongo).findOne();
      const services = await Service(req.mongo).find();

      res.status(201).json({
        msg: "all the business",
        services,
        business,
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
