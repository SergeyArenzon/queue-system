module.exports = (app) => {
  app.use(
    "/:businessUrl/business",
    require("./business/index.business-route")()
  );
};
