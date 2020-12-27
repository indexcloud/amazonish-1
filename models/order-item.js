module.exports = (sequelize, Sequelize) => {
	const OrderItem = sequelize.define("orderItem", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		quantity: Sequelize.INTEGER,
	});
	return OrderItem;
};
