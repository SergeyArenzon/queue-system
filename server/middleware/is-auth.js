const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth, error404 } = require("../helper/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind) => {
  return async (req, res, next) => {
    const token = req.body.token;

    error401auth(token);
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

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
        default:
          const error = new Error("error in the path");
          error.statusCode = 404;
          return next(error);
      }
    } catch (err) {
      next(err);
    }

    return next();
  };
};
