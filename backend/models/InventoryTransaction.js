// models/InventoryTransaction.js
const mongoose = require("mongoose");

const InventoryTransactionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  type: { type: String, enum: ["adjustment", "order", "return", "transfer"], required: true },
  quantity: { type: Number, required: true },
  previousQuantity: Number,
  newQuantity: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model("InventoryTransaction", InventoryTransactionSchema);
