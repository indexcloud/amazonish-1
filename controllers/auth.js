const passport = require("passport");

exports.getSignUp = (req, res, next) => {
	res.render("auth/signup", {
		pageTitle: "Sign Up",
		path: "/signup",
	});
};

exports.postSignUp = (req, res, next) => {
	res.redirect("/signin");
};

exports.getSignIn = (req, res, next) => {
	res.render("auth/signin", {
		pageTitle: "Sign In",
		path: "/signin",
	});
};

exports.postSignIn = (req, res, next) => {
	req.session.isLoggedIn = true;
	res.redirect("/products");
};

exports.getSignOut = (req, res, next) => {
	req.session.destroy(err => {
		res.redirect("/");
	});
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/signin");
};
