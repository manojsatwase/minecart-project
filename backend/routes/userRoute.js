const express = require("express");
const { register, login, logout, myProfile, getAllUsers, updateProfile } = require("../controllers/userController");
const { isAuthenticated, restrictToAdmin } = require("../utils/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated,myProfile).post(isAuthenticated,updateProfile);
router.route("/update-password").post(isAuthenticated,updatedPassword);
router.route("/admin/users").get(isAuthenticated,restrictToAdmin,getAllUsers);

module.exports = router;