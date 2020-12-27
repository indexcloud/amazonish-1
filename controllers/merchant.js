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
	// if (!req.body.title) {
	// 	res.satus(400).send({
	// 		message: "Content can not be empty!",
	// 	});
	// 	return;
	// }

	// const product = {
	// 	title: req.body.title,
	// 	imageUrl: req.body.imageUrl,
	// 	price: req.body.price,
	// 	description: req.body.description,
	// 	review: req.body.review,
	// };

	// Product.create(product)
	// 	.then(result => {
	// 		console.log("Created Product");
	// 		res.redirect("/merchant/products");
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: err.message || "Some error occurred while creating the Tutorial.",
	// 		});
	// 	});
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	req.user
		.createProduct({
			title: title,
			price: price,
			imageUrl: imageUrl,
			description: description,
		})
		.then(result => {
			// console.log(result);
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

exports.pathEditProduct = (req, res, next) => {
	// const id = req.params.id;
	// Product.update(req.body, {where: {id: id}})
	// 	.then(num => {
	// 		if (num == 1) {
	// 			res.send({
	// 				message: "Product was udpated successfully.",
	// 			});
	// 		} else {
	// 			res.send({
	// 				message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
	// 			});
	// 		}
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: "Error updating Product with id=" + id,
	// 		});
	// 	});
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDesc = req.body.description;
	Product.findByPk(prodId)
		.then(product => {
			product.title = updatedTitle;
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
	// const id = req.params.id;

	// Product.destroy({
	// 	where: {id: id},
	// })
	// 	.then(num => {
	// 		if (num == 1) {
	// 			// res.send({
	// 			// 	message: "Product was deleted successfully!",
	// 			// });
	// 			res.redirect("/merchant/products");
	// 		} else {
	// 			res.send({
	// 				message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
	// 			});
	// 		}
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: "Could not delete Product with id=" + id,
	// 		});
	// 	});
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
