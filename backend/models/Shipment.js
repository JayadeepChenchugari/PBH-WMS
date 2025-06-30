const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  sku: { type: String },
  name: { type: String, required: true }, // <- make sure this line exists
  quantity: { type: Number, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  receivedDate: { type: Date, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  status: {
    type: String,
    enum: ["scheduled", "in_transit", "delivered", "cancelled"],
    default: "scheduled"
  }
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
