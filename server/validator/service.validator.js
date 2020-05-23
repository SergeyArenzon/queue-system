const { body } = require("express-validator");

exports.serviceValidator = [
  body("title").trim().isLength({ min: 1 }).withMessage("שם קטגוריה חייב להיות לפחות 2 תווים"),
  body("title").trim().isLength({ min: 1 }).withMessage("שם שירות חייב להיות לפחות 2 תווים"),
  body("price").trim().isNumeric(),
  body("duration").trim().isNumeric(),
];
