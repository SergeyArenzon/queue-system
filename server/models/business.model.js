const mongoose = require("mongoose");
const { mongoConnect } = require("../app");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true, // remove whitespace characters
      maxlength: 32,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
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
    },
    logo: {
      type: String,
      required: false,
      default: "",
    },
    links: {
      type: Map,
      require: false,
      default: {},
    },
    about: {
      type: String,
      require: false,
      default: "",
    },
    notifications: {
      type: [String],
      require: false,
      default: [],
    },

    schedule: {
      type: Map,
      require: false,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
