exports.getSignUp = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		pageTitle: "Sign Up",
		path: "/signup",
		errorMessage: message,
	});
};

exports.postSignUp = (req, res, next) => {
	res.redirect("/signin");
};

exports.getSignIn = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signin", {
		pageTitle: "Sign In",
		path: "/signin",
		errorMessage: message,
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

exports.getReset = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/reset", {
		path: "/reset",
		pageTitle: "Reset Password",
		errorMessage: message,
	});
};
