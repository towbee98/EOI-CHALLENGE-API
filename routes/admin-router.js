const express = require("express");
const AdminController = require("../controller/admin-controller");
const AuthController = require("../controller/auth-controller");

const router = express.Router();

router.route("/login", AuthController.login);

//router.use(AuthController.protect);
router
  .route("/")
  .post(AdminController.addAdmin)
  .get(AdminController.getAllAdmins);
router
  .route("/:adminID")
  .patch(AdminController.updateAdmin)
  .delete(AdminController.removeAdmin);

module.exports = router;
