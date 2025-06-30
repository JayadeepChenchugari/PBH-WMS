const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find().sort({ timestamp: -1 });
  res.json(logs);
};

exports.getLogsByUser = async (req, res) => {
  const logs = await AuditLog.find({ user: req.params.userId });
  res.json(logs);
};

exports.getLogsByAction = async (req, res) => {
  const logs = await AuditLog.find({ action: req.params.action });
  res.json(logs);
};
