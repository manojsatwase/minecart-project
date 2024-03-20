const express = require("express");
const { registerUser, loginUser, logout, myProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../utils/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated,myProfile);

module.exports = router;