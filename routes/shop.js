const express = require("express");
const passport = require("passport");
const shopController = require("../controllers/shop");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/", shopController.getIndex); // Shop index page before log in

router.get("/products", authController.isLoggedIn, shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", authController.isLoggedIn, shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

router.get("/orders", authController.isLoggedIn, shopController.getOrders);

module.exports = router;
