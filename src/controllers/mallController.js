const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const sequelize = require('../config/db');

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['created_at', 'DESC']] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, productId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order = await Order.create({
      user_id: userId,
      product_id: productId,
      amount: product.price,
      status: 0 // Paid
    }, { transaction });

    // --- Distribution Logic ---
    const user = await User.findByPk(userId);
    if (user && user.inviter_id) {
      // Level 1: 10%
      const commission1 = order.amount * 0.10;
      await User.increment({ balance: commission1 }, { where: { id: user.inviter_id }, transaction });
      
      // Level 2: 5%
      if (user.grand_inviter_id) {
        const commission2 = order.amount * 0.05;
        await User.increment({ balance: commission2 }, { where: { id: user.grand_inviter_id }, transaction });
      }
    }

    await transaction.commit();
    res.json({ message: 'Order created and commission distributed', order });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};
