module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define("order", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	});
	return Order;
};
