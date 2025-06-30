const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('items.inventoryItem createdBy');
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.inventoryItem');
  res.json(order);
};

exports.createOrder = async (req, res) => {
  const order = new Order({ ...req.body, createdBy: req.user.id });
  await order.save();
  res.status(201).json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
