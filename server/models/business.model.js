const mongoose = require("mongoose");
const { mongoConnect } = require("../app");

const businessSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      trim: true,
      required: true, // remove whitespace characters
      maxlength: 32,
    },
    businessAddress: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    businessPhone: {
      type: String,
      trim: true,
      required: true,
      maxlength: 11,
    },
    businessEmail: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: "",
    },
    socialMediaLinks: {
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
      type: [
        {
          day: {
            type: String,
            required: true,
          },
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
