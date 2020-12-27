const bcrypt = require("bcrypt");

module.exports = (passport, user) => {
	const User = user;
	const LocalStrategy = require("passport-local").Strategy;

	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true, // allows us to pass back the entire request to the callback
			},

			function (req, username, password, done) {
				const generateHash = password => {
					return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
				};

				User.findOne({
					where: {
						username: username,
					},
				}).then(user => {
					if (user) {
						return done(null, false, {
							message: "User already existed",
						});
					} else {
						const userPassword = generateHash(password);
						const data = {
							role: username === "merchant" ? "0" : "1",
							username: username,
							email: req.body.email,
							password: userPassword,
						};
						User.create(data).then((newUser, created) => {
							if (!newUser) {
								return done(null, false);
							}
							if (newUser) {
								return done(null, newUser);
							}
						});
					}
				});
			}
		)
	);

	// serialize
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// deserialzie user
	passport.deserializeUser((id, done) => {
		User.findByPk(id).then(user => {
			if (user) {
				done(null, user); // return req.user for routes and controllers
			} else {
				done(user.errors, null);
			}
		});
	});

	// Local Signin
	passport.use(
		"local-signin",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},

			function (req, username, password, done) {
				const User = user;
				const isValidPassword = (userpass, password) => {
					return bcrypt.compareSync(password, userpass);
				};

				User.findOne({
					where: {
						username: username,
					},
				})
					.then(user => {
						if (!user) {
							return done(null, false, {
								message: "User does not exist",
							});
						}
						if (!isValidPassword(user.password, password)) {
							return done(null, false, {
								message: "Incorrect password.",
							});
						}

						user.createCart();
						const userinfo = user.get();
						return done(null, userinfo);
					})
					.catch(err => {
						console.log("Error:", err);

						return done(null, false, {
							message: "Something went wrong with your Signin",
						});
					});
			}
		)
	);
};
