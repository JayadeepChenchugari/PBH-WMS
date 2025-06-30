const InventoryTransaction = require('../models/InventoryTransaction');

exports.getAllTransactions = async (req, res) => {
  const txns = await InventoryTransaction.find().populate('item user');
  res.json(txns);
};

exports.getTransactionsByItem = async (req, res) => {
  const txns = await InventoryTransaction.find({ item: req.params.itemId });
  res.json(txns);
};

exports.recordTransaction = async (req, res) => {
  const txn = new InventoryTransaction(req.body);
  await txn.save();
  res.status(201).json(txn);
};
