const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true, // remove whitespace characters
    maxlength: 32,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    maxlength: 11,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
  schedule: {
    type: [
      {
        day: {
          type: String,
          required: true,
        },
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
