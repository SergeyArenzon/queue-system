const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth, error404 } = require("../helper/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind, mongoose = null) => {
  return async (req, res, next) => {
    console.log(req.get("Authorization"));

    let token = kind === "resetPassword" ? req.params.token : req.body.token;
    if (!token) token = req.get("Authorization");
    error401auth(token);
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      error404(decodedToken);
      switch (kind) {
        case "employee":
          req.employee = await Employee(req.mongo).findById(
            decodedToken.employeeId
          );

          error404(req.employee);
          break;
        case "client":
          req.client = await Client.findById(decodedToken.clientId);
          error404(req.client);
          break;

        case "resetPassword":
          req.domain = decodedToken.domain.domain;

          req.mongo = mongoose.connection.useDb(req.domain);
          req.employee = await Employee(req.mongo).findOne({
            phone: decodedToken.phone,
          });
          error404(req.employee);
          break;

        default:
          const error = new Error("error in the path");
          error.statusCode = 404;
          return next(error);
      }
    } catch (err) {
      return next(err);
    }

    return next();
  };
};
