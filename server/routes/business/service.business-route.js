const express = require("express");
const router = express.Router();

const serviceController = require("../../controller/business/service.business-controller");
const isAuth = require("../../middleware/is-auth");

const { serviceValidator } = require("../../validator/service.validator");

router.post(
  "/",
  serviceValidator,
  isAuth("employee"),
  serviceController.postService
);
router.get(
  "/",
  isAuth("employee"),
  serviceController.getServices
);
router.put(
  "/:serviceId",
  serviceValidator,
  isAuth("employee"),
  serviceController.putService
);

router.delete(
  "/:serviceId",
  isAuth("employee"),
  serviceController.deleteService
);

module.exports = router;
