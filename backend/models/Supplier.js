const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplierCode: { type: String, required: true, unique: true }, // unique identifier
  contactPerson: String,
  phone: String,
  email: String,
  address: String,
  gstNumber: String,
  leadTimeDays: Number, // estimated delivery lead time
  rating: { type: Number, min: 1, max: 5 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Supplier", SupplierSchema);
