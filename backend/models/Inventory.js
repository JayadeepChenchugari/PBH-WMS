// models/Inventory.js
const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String }, // <== Add this
  quantity: { type: Number, default: 0 },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  category: String,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Inventory", InventorySchema);
