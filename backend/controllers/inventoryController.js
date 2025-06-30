const Inventory = require('../models/Inventory');

exports.getAllItems = async (req, res) => {
  const items = await Inventory.find().populate('location supplier');
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  res.json(item);
};

exports.createItem = async (req, res) => {
  const item = new Inventory(req.body);
  await item.save();
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
