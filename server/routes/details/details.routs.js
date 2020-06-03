const router = require("express").Router();
const businessDetailsController = require("../../controller/details/details.domain-controller");
const isAuth = require("../../middleware/is-auth");

const {
  businessDetailsValidator,
  // businessHoursValidator,
} = require("../../validator/management/business.validator");

router.get(":domain/details ", businessDetailsController.getBuisnessDetails);

router.post(
  "buiness/details",
  businessDetailsValidator,
  isAuth("employee"),
  businessDetailsController.postBuisnessDetails
);

router.delete(
  "buiness/details",
  businessDetailsValidator,
  isAuth("employee"),
  businessDetailsController.postBuisnessDetails
);

// router.post(
//   "/hours",
//   // businessHoursValidator,
//   isAuth("employee"),
//   businessDetailsController.postBuisnessHours
// );

// router.post("/defualthours", businessDetailsController.postDefualtHours);333


module.exports = router;
