// models/MaintenanceTask.js
const mongoose = require("mongoose");

const MaintenanceTaskSchema = new mongoose.Schema({
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scheduledDate: Date,
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }
});

module.exports = mongoose.model("MaintenanceTask", MaintenanceTaskSchema);
