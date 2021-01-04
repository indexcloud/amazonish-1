const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth");
const router = express.Router();

// Local Sign Up
router.get("/signup", authController.getSignUp);

router.post("/signup", passport.authenticate("local-signup"), authController.postSignUp);

// Local Sign In
router.get("/signin", authController.getSignIn);

router.post("/signin", passport.authenticate("local-signin"), authController.postSignIn);

// Google Sign In
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/signin"}), function (req, res) {
	req.session.isLoggedIn = true;
	res.redirect("/products");
});

// Sign Out
router.get("/signout", authController.getSignOut);

module.exports = router;
