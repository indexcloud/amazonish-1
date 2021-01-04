require("dotenv").config();
const express = require("express");

const app = express();
const passport = require("passport");
const session = require("express-session");

const errorController = require("./controllers/error");

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

// Importing routes
const mechantRoutes = require("./routes/merchant");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// Express BodyParser
app.use(express.json()); // request body has been parsed
app.use(express.urlencoded({extended: false})); // request body has been url encoded
app.use(express.static("./public")); // linked to css and js files

// For Passport
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const db = require("./models");

require("./config/passport.js")(passport, db.user);

// Passing local variables to Template Engine Render Pages
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	// res.locals.csrfToken = req.csrfToken();
	next();
});

app.use(authRoutes);
app.use(shopRoutes);
app.use("/merchant", mechantRoutes);

app.use("*", errorController.get404);

db.sequelize
	.sync()
	.then(result => {
		console.log("Database looks fine");
	})
	.catch(err => {
		console.log(err);
	});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
