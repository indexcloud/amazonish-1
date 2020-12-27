module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define("product", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		title: Sequelize.STRING,
		imageUrl: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		price: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		review: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});
	return Product;
};
