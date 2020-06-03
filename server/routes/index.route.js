module.exports = (app, mongoose) => {

  app.use("/business", async (req, res, next) => {
    try {

      const domain = req.get("domain");
      req.mongo = mongoose.connection.useDb(domain);
      next();
    } catch (error) {
      next(error);
    }
  });

  app.use("/business", require("./business/index.business-route"));

<<<<<<< HEAD
  app.use(async (req, res, next) => {    
    try {      
=======


  app.use("/:domain", async (req, res, next) => {
    try {
>>>>>>> cd5c1542fa87cc31720ae07667e548cf504df6a8
      const domain = req.params.domain;
      console.log("second", domain);
      req.mongo = mongoose.connection.useDb(domain);
      next();
    } catch (error) {
      next(error);
    }
  });


  app.use("/:domain", require("./domain/index.domain-route"));

  require("../utils/error/index.error")(app);
};
