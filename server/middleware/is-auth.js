const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth, error404 } = require("../helper/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind) => {
  return async (req, res, next) => {
    const token = req.body.token;
    console.log(req.body);

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);

      error401auth(decodedToken);

      switch (kind) {
        case "employee":
          req.employee = await Employee.findById(decodedToken.employeeId);
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
      return next(err);
    }

    return next();
  };
};
