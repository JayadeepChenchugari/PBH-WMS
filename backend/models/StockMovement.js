const mongoose = require("mongoose");

const StockMovementSchema = new mongoose.Schema(
  {
    inventoryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["inbound", "outbound", "transfer"],
      required: true,
    },
    fromLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    toLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockMovement", StockMovementSchema);
