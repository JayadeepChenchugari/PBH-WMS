// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');
const Location = require('../models/Location');
const User = require('../models/User');

router.get('/stats', async (req, res) => {
  try {
    const totalInventory = await Inventory.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalLocations = await Location.countDocuments();
    const totalUsers = await User.countDocuments();
    const lowStockItems = await Inventory.countDocuments({ quantity: { $lt: 10 } });

    res.json({
      totalInventory,
      totalSuppliers,
      totalLocations,
      totalUsers,
      lowStockItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
