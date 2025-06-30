// controllers/dashboardController.js
const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');
const Location = require('../models/Location');
const User = require('../models/User');
const Order = require('../models/Order'); // <-- ADD THIS LINE

exports.getDashboardStats = async (req, res) => {
  try {
    const totalInventory = await Inventory.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalLocations = await Location.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments(); // <-- ADD THIS LINE
    const lowStockItems = await Inventory.countDocuments({ quantity: { $lt: 10 } });

    res.json({
      totalInventory,
      totalSuppliers,
      totalLocations,
      totalUsers,
      lowStockItems,
      totalOrders, // <-- ADD THIS
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard stats fetch failed" });
  }
};
