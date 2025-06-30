const OutgoingShipment = require("../models/OutgoingShipment");
const Inventory = require("../models/Inventory");

exports.createOutgoingShipment = async (req, res) => {
  try {
    const { item, quantity, customerName, address } = req.body;

    const inventoryItem = await Inventory.findById(item);
    if (!inventoryItem) return res.status(404).json({ message: "Item not found." });

    if (inventoryItem.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient inventory." });
    }

    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    const shipment = await OutgoingShipment.create({
      item,
      quantity,
      customerName,
      address,
    });

    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOutgoingShipments = async (req, res) => {
  const shipments = await OutgoingShipment.find().populate("item");
  res.json(shipments);
};
