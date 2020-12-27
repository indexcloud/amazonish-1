const express = require("express");
const passport = require("passport");
const merchantController = require("../controllers/merchant");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.send("You are in the merchant mode.");
});

router.get("/products", merchantController.getProducts); // Shop index page after log in
// router.get("/products", authController.IsAuthenticated, merchantController.getProducts); // check log in before go to another route

router.get("/add-product", merchantController.getAddProduct);

router.post("/add-product", merchantController.postAddProduct);

router.get("/edit-product/:id", merchantController.getEditProduct);

router.patch("/edit-product/:id", merchantController.pathEditProduct);

router.post("/delete-product", merchantController.deleteProduct); // delete or post

module.exports = router;
