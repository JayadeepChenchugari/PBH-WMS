// models/Return.js
const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
  returnNumber: { type: String, required: true, unique: true },
  inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  quantity: { type: Number, required: true },
  reason: String,
  returnType: { type: String, enum: ["customer", "supplier"] },
  status: { type: String, enum: ["pending", "processed"], default: "pending" },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  processedAt: Date
});

module.exports = mongoose.model("Return", ReturnSchema);
