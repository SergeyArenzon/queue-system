const { body } = require("express-validator");
const Emplyee = require("../models/employee.model");

const hebrewErrorValidator = require("./hebrewErrorValidator");

exports.employeeValidator = [
  body("firstName", hebrewErrorValidator.firstNameHebError)
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 2,
      max: 12,
    }),
  body("lastName", hebrewErrorValidator.lastNameHebError).trim().notEmpty(),
  body("email", hebrewErrorValidator.emailHebError)
    .isEmail()
    .normalizeEmail()
    .custom((value, { req }) => {
      return Emplyee(req.mongo)
        .findOne({ email: value })
        .then((userDoc) => {
          if (userDoc)
            return Promise.reject(
              hebrewErrorValidator.emailRegisterExistHebError
            );
        });
    }),
  body("password", hebrewErrorValidator.passwordHebError)
    .trim()
    .notEmpty()
    .isLength({
      min: 6,
    }),
  body("phone", hebrewErrorValidator.phoneHebError)
    .isMobilePhone()
    .custom((value, { req }) => {
      return Emplyee(req.mongo)
        .findOne({ phone: value })
        .then((userDoc) => {
          if (userDoc)
            return Promise.reject(
              hebrewErrorValidator.phoneRegisterExistHebError
            );
        });
    }),
];
