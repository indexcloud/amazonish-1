const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.getProducts = (req, res, next) => {
	const title = req.query.title;
	let condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null;

	req.user
		.getProducts({where: condition})
		.then(products => {
			res.render("merchant/products", {
				prods: products,
				pageTitle: "Merchant Products",
				path: "/merchant/products",
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving products",
			});
		});
};

exports.getAddProduct = (req, res, next) => {
	res.render("merchant/edit-product", {
		pageTitle: "Add Product",
		path: "/merchant/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const category = req.body.category;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	req.user
		.createProduct({
			title: title,
			category: category,
			price: price,
			imageUrl: imageUrl,
			description: description,
		})
		.then(result => {
			console.log("Created Product");
			res.redirect("/merchant/products");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	req.user
		.getProducts({where: {id: prodId}})
		// Product.findByPk(prodId)
		.then(products => {
			const product = products[0];
			if (!product) {
				return res.redirect("/");
			}
			res.render("merchant/edit-product", {
				pageTitle: "Edit Product",
				path: "/merchant/edit-product",
				editing: editMode,
				product: product,
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedCategory = req.body.category;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDesc = req.body.description;
	Product.findByPk(prodId)
		.then(product => {
			product.title = updatedTitle;
			product.category = updatedCategory;
			product.price = updatedPrice;
			product.description = updatedDesc;
			product.imageUrl = updatedImageUrl;
			return product.save();
		})
		.then(result => {
			console.log("UPDATED PRODUCT!");
			res.redirect("/merchant/products");
		})
		.catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByPk(prodId)
		.then(product => {
			return product.destroy();
		})
		.then(result => {
			console.log("DESTROYED PRODUCT");
			res.redirect("/merchant/products");
		})
		.catch(err => console.log(err));
};
