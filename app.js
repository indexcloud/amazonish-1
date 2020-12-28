require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const errorController = require("./controllers/error");

const app = express();
const passport = require("passport");
const session = require("express-session");

// Importing routes
const mechantRoutes = require("./routes/merchant");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

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
