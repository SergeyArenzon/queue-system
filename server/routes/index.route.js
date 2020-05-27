module.exports = (app, mongoose) => {
  const router = require("express").Router();
  app.use("/management/:domain", require("./business/index.business-route"));

  router.get("/check/:domain", async (req, res, next) => {
    const domain = req.params.domain;
    try {
      let ans = await require("./models/domain.model").find();
      ans = ans.every((e) => e.domain !== domain);
      errorDomain401(ans);
      res.status(200).json({ message: "Domain is free" });
    } catch (error) {
      next(error);
    }
  });

  app.use("/:domain", async (req, res, next) => {
    try {
      const domain = req.params.domain;

      req.mongo = mongoose.connection.useDb(domain);

      next();
    } catch (error) {
      next(error);
    }
  });

  app.use("/:domain", require("./domain/index.domain-route"));

  router.get("/", async (req, res, next) => {
    res.status(200).json({ message: "get only the address" });
  });

  require("../utils/error/index.error")(app);
};
