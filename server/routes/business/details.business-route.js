const express = require("express");
const router = express.Router();

const businessDetailsController = require("../../controller/business/details.business-controller");
const isAuth = require("../../middleware/is-auth");

const {
  businessDetailsValidator,
  businessHoursValidator,
} = require("../../validator/business.validator");

router.post(
  "/",
  businessDetailsValidator,
  isAuth("employee"),
  businessDetailsController.postBuisnessDetails
);

router.post(
  "/hours",
  // businessHoursValidator,
  isAuth("employee"),
  businessDetailsController.postBuisnessHours
);

router.post(
  "/defualthours",

  businessDetailsController.postDefualtHours
);

router.get("/", businessDetailsController.getBuisnessDetails);

module.exports = router;
