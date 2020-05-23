const { body } = require("express-validator");
const Emplyee = require("../models/employee.model");

exports.employeeValidator = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("שם פרטי הוא שדה חובה")
    .isLength({
      min: 2,
      max: 12,
    }),
  body("lastName", "שם משפחה הוא שדה חובה").trim().notEmpty(),
  body("email", "@ אימייל חייב להיות בין 3 ל 32 תווים אימייל חייב להכיל")
    .isEmail()
    .normalizeEmail()
    .custom((value, { req }) => {
      return Emplyee(req.mongo)
        .findOne({ email: value })
        .then((userDoc) => {
          if (userDoc) return Promise.reject("אימייל כבר קיים במערכת");
        });
    }),
  body("password", "סיסמא הוא שדה חובה").trim().notEmpty().isLength({
    min: 6,
  }),
  body("phone", "טלפון הוא שדה חובה")
    .isMobilePhone()
    .custom((value, { req }) => {
      return Emplyee(req.mongo)
        .findOne({ phone: value })
        .then((userDoc) => {
          if (userDoc) return Promise.reject("הטלפון קיים כבר");
        });
    }),
];
