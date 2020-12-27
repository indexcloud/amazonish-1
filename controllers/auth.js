exports.getSignUp = (req, res, next) => {
	res.render("shop/signup", {
		pageTitle: "Sign Up",
		path: "/signup",
	});
};

exports.getSignIn = (req, res, next) => {
	res.render("shop/signin", {
		pageTitle: "Sign In",
		path: "/signin",
	});
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
