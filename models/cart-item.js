module.exports = (sequelize, Sequelize) => {
	const CartItem = sequelize.define("cartItem", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		quantity: Sequelize.INTEGER,
	});
	return CartItem;
};
