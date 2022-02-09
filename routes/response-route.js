const express = require("express");
const response = require("../controller/response-controller");
const AuthController = require("../controller/auth-controller");
const router = express.Router();

router.post("/interest", response.submitResponse);

//router.use(AuthController.protect);
router.route("/responses").get(response.getAllResponses);
router
  .route("/responses/:email")
  .patch(response.updateResponse)
  .delete(response.deleteResponse);

module.exports = router;
