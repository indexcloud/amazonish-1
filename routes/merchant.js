const express = require("express");
const passport = require("passport");
const merchantController = require("../controllers/merchant");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/products", authController.isLoggedIn, merchantController.getProducts); // Shop index page after log in

router.get("/add-product", authController.isLoggedIn, merchantController.getAddProduct);

router.post("/add-product", authController.isLoggedIn, merchantController.postAddProduct);

router.get("/edit-product/:productId", authController.isLoggedIn, merchantController.getEditProduct);

router.post("/edit-product/", authController.isLoggedIn, merchantController.postEditProduct);

router.post("/delete-product", authController.isLoggedIn, merchantController.deleteProduct); // delete or post

module.exports = router;
