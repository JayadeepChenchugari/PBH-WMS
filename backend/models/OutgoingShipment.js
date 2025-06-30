const mongoose = require("mongoose");

const OutgoingShipmentSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
  quantity: { type: Number, required: true },
  customerName: String,
  address: String,
  shippedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OutgoingShipment", OutgoingShipmentSchema);
