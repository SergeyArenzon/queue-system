const { body } = require("express-validator");

exports.serviceValidator = [
  body("title").trim().isLength({ min: 1 }),
  body("price").trim().isNumeric(),
  body("duration").trim().isNumeric(),
];
