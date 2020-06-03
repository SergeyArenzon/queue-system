const router = require("express").Router();
const businessDetailsController = require("../../controller/details/details.domain-controller");
const isAuth = require("../../middleware/is-auth");

const {
  businessDetailsValidator,
  // businessHoursValidator,
} = require("../../validator/management/business.validator");
router.get("/", businessDetailsController.getBuisnessDetails);

// router.post(
//   "/",
//   businessDetailsValidator,
//   isAuth("employee"),
//   businessDetailsController.postBuisnessDetails
// );

// router.post(
//   "/hours",
//   // businessHoursValidator,
//   isAuth("employee"),
//   businessDetailsController.postBuisnessHours
// );

// router.post("/defualthours", businessDetailsController.postDefualtHours);333


module.exports = router;
