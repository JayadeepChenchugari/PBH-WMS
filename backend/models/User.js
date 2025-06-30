const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "operator", "manager"], default: "operator" },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
