const { body } = require("express-validator");
// const Emplyee = require("../models/employee.model");

exports.businessDetailsValidator = [
  //Business Details
  body("name").trim().not().isEmpty().withMessage("שם העסק הוא שדה חובה"),
  body("address", "כתובת העסק הוא שדה חובה").trim().notEmpty(),
  body("email", "אימייל חייב להיות בין 3 ל 32 תווים")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("phone", "טלפון העסק הוא שדה חובה").trim().isMobilePhone(),
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
