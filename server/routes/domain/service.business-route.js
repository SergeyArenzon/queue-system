const router = require("express").Router();
const serviceController = require("../../controller/domain/service.domain-controller");
const isAuth = require("../../middleware/is-auth");

const {
  serviceValidator,
} = require("../../validator/management/service.validator");

router.get("/", serviceController.getServices);

router.post(
  "/",
  serviceValidator,
  isAuth("employee"),
  serviceController.postService
);

router.put(
  "/",
  serviceValidator,
  isAuth("employee"),
  serviceController.putService
);

router.delete("/", isAuth("employee"), serviceController.deleteService);
module.exports = router;
