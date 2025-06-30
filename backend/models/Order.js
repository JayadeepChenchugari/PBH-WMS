// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [
    {
      inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
      quantity: Number
    }
  ],
  type: { type: String, enum: ["inbound", "outbound"], required: true },
  status: { type: String, enum: ["pending", "processing", "completed"], default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
