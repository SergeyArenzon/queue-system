const { body } = require("express-validator");
const Emplyee = require("../models/employee.model");
exports.businessSignupValidator =
  // Manager Details

  [
    //Business Details
    body("businessName").not().isEmpty().withMessage("שם העסק הוא שדה חובה"),
    body("businessAddress", "כתובת העסק הוא שדה חובה").notEmpty(),
    body("businessEmail", "אימייל חייב להיות בין 3 ל 32 תווים")
      .matches(/.+\@.+\..+/)
      .withMessage("אימייל חייב להכיל @")
      .isLength({
        min: 6,
        max: 32,
      }),
    body("businessPhone", "טלפון העסק הוא שדה חובה").notEmpty(),
  ];

exports.employeeValidator =
  // Manager Details
  [
    body("firstName")
      .not()
      .isEmpty()
      .withMessage("שם פרטי הוא שדה חובה")
      .isLength({
        min: 2,
        max: 32,
      }),

    body("lastName", "שם משפחה הוא שדה חובה").trim().notEmpty(),
    body("email", "@ אימייל חייב להיות בין 3 ל 32 תווים אימייל חייב להכיל")
      .isEmail()
      .custom((value, { req }) => {
        return Emplyee.findOne({ email: value }).then((userDoc) => {
          if (userDoc) return Promise.reject("email adress exist already");
        });
      })
      .normalizeEmail(),
    body("email", "אימייל חייב להיות בין 3 ל 32 תווים")
      .matches(/.+\@.+\..+/)
      .withMessage("אימייל חייב להכיל @")
      .isLength({
        min: 6,
        max: 32,
      }),
    body("password", "סיסמא הוא שדה חובה").notEmpty(),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("הסיסמא חייבת להכיל לפחות 6 תווים")
      .matches(/\d/)
      .withMessage("הסיסמא חייבת להכיל מספר"),
    body("phone", "טלפון הוא שדה חובה")
      .isMobilePhone()
      .custom((value, { req }) => {
        return Emplyee.findOne({ phone: value }).then((userDoc) => {
          if (userDoc) return Promise.reject("הטלפון קיים כבר");
        });
      }),
  ];

exports.serviceValidator = [
  body("title").trim().isLength({ min: 1 }),
  body("price").trim().isNumeric(),
  body("duration").trim().isNumeric(),
];
