const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth } = require("../helper/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind) => {
  return async (req, res, next) => {
    const token = req.body.token;

    try {
      error401auth(token);
      const decodedToken = jwt.verify(token, process.env.SECRET);

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
// exports.user = async (req, res, next) => {
//   const token = req.body.token;

//   if (!token) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     return next(error);
//   }

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.SECRET);

//     if (!decodedToken) {
//       const error = new Error("Not authenticated.");
//       error.statusCode = 401;
//       return next(error);
//     }
//     req.user = await User.findById(decodedToken.userId);
//   } catch (err) {
//     return next(err);
//   }

//   return next();
// };
// exports.client = async (req, res, next) => {
//   const token = req.body.token;

//   if (!token) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     return next(error);
//   }

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.SECRET);

//     if (!decodedToken) {
//       const error = new Error("Not authenticated.");
//       error.statusCode = 401;
//       return next(error);
//     }
//     req.client = await Client.findById(decodedToken.clientId);
//   } catch (err) {
//     return next(err);
//   }

//   return next();
// };
