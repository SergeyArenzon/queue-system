module.exports = (app) => {
  app.use("/business", require("./business/index.business-route"));
};
