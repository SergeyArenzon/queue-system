const { body } = require("express-validator");
// const Emplyee = require("../models/employee.model");

const hebrewErrorValidator = require("./hebrewErrorValidator");
exports.businessDetailsValidator = [
  //Business Details
  body("name", hebrewErrorValidator.businessNameHebError)
    .trim()
    .not()
    .isEmpty(),
  body("address", hebrewErrorValidator.businessAdressHebError)
    .trim()
    .notEmpty(),
  body("email", hebrewErrorValidator.emailHebError)
    .trim()
    .normalizeEmail()
    .isEmail(),
  body("phone", hebrewErrorValidator.phoneHebError).trim().isMobilePhone(),
];

// exports.businessHoursValidator = [
//   body("schedule")
//     .custom((value) => {
//       return (
//         Array.isArray(value) && value.every((e) => e.startTime < e.endTime)
//       );
//     })
//     .withMessage("בעיה בלוח זמנים"),
// ];
