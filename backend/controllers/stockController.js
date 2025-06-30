const StockMovement = require("../models/StockMovement");
const Inventory = require("../models/Inventory");

exports.createStockMovement = async (req, res) => {
  try {
    const { inventoryItem, quantity, type, fromLocation, toLocation, remarks } = req.body;

    const item = await Inventory.findById(inventoryItem);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });

    if (type === "inbound") {
      item.quantity += quantity;
    } else if (type === "outbound") {
      if (item.quantity < quantity) {
        return res.status(400).json({ message: "Not enough stock" });
      }
      item.quantity -= quantity;
    } else if (type === "transfer") {
      // In real system, you'd split quantities across locations
      // This example only tracks the event.
    }

    await item.save();

    const movement = new StockMovement({
      inventoryItem,
      quantity,
      type,
      fromLocation,
      toLocation,
      remarks,
      createdBy: req.user?._id,
    });

    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find()
      .populate("inventoryItem")
      .populate("fromLocation")
      .populate("toLocation")
      .populate("createdBy", "email role");
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
