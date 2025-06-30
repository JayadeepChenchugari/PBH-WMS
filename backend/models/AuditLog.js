// models/AuditLog.js
const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  action: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetType: String,
  targetId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
  changes: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
