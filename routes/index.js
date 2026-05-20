var express = require("express");
var router = express.Router();

const authController = require(
  "../controllers/authController"
);

const profileController = require(
  "../controllers/profileController"
);

router.get("/", (req, res) => {
  res.redirect("/register");
});

router.get(
  "/register",
  authController.getRegister
);

router.post(
  "/register",
  authController.register
);

router.get(
  "/login",
  authController.getLogin
);

router.post(
  "/login",
  authController.login
);

router.get(
  "/profile",
  profileController.getProfile
);

module.exports = router;
