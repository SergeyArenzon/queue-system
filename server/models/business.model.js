const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    manegerDetails: {
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
    },
    businessDetails: {
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
        unique: true,
      },
      businessEmail: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
