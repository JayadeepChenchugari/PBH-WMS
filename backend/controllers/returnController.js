const Return = require('../models/Return');

exports.getAllReturns = async (req, res) => {
  const returns = await Return.find();
  res.json(returns);
};

exports.getReturnById = async (req, res) => {
  const returnData = await Return.findById(req.params.id);
  res.json(returnData);
};

exports.createReturn = async (req, res) => {
  const returnItem = new Return(req.body);
  await returnItem.save();
  res.status(201).json(returnItem);
};

exports.updateReturnStatus = async (req, res) => {
  const returnData = await Return.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(returnData);
};
