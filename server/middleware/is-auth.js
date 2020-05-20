const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth } = require("../helper/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind) => {
  return async (req, res, next) => {
    const token = req.body.token.trim();
    console.log(token);

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      error401auth(decodedToken);

      switch (kind) {
        case "employee":
          req.employee = await Employee.findById(decodedToken.employeeId);
          break;
        case "client":
          req.client = await Client.findById(decodedToken.clientId);
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
