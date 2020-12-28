const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: dbConfig.dialect,
	operatorsAliases: 0,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Product = require("./product")(sequelize, Sequelize);
const User = require("./user")(sequelize, Sequelize);
const Cart = require("./cart")(sequelize, Sequelize);
const CartItem = require("./cart-item")(sequelize, Sequelize);
const Order = require("./order")(sequelize, Sequelize);
const OrderItem = require("./order-item")(sequelize, Sequelize);

// Define tables relations
Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

db.product = Product;
db.user = User;
db.cart = Cart;
db.cartItem = CartItem;
db.order = Order;
db.orderItem = OrderItem;

module.exports = db;
