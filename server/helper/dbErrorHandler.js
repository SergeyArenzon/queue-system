"use strict";
const { validationResult } = require("express-validator");

/**
 * Get unique error field name
 */
const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " קיים";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
exports.errorHandler = (error) => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "שגיאה";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};

exports.error422 = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed ");
    error.statusCode = 422;
    error.data = errors.array();
    console.log(error.data);

    throw error;
  }
};

exports.error401 = (isEqual) => {
  if (!isEqual) {
    const error = new Error("Wrong password");
    error.statusCode = 401;
    throw error;
  }
};

exports.error404 = (obj) => {
  if (!obj) {
    const error = new Error("could not find the object");
    error.statusCode = 404;
    throw error;
  }
};

exports.error401auth = (token) => {
  if (!token) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
};

exports.error403Admin = (req) => {
  if (req.employee.isAdmin) {
    const error = new Error("not auth to do this");
    error.statusCode = 403;
    throw error;
  }
};
