

const Shipment = require('../models/Shipment');
const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');
exports.createShipment = async (req, res) => {
  try {
    const { sku, name, quantity, supplier, receivedDate, location } = req.body;

    const newShipment = new Shipment({
      shipmentId: `SHIP-${Date.now()}`,
      name,
      quantity,
      supplier,
      receivedDate,
      sku,
      location,
    });

    await newShipment.save();

    const existingItem = await Inventory.findOne({ sku });

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
      await existingItem.save();
    } else {
      const newItem = new Inventory({
        sku,
        name,
        quantity: parseInt(quantity),
        supplier,
        location, // ✅ store location in inventory
        lastUpdated: new Date(),
      });
      await newItem.save();
    }

    res.status(201).json(newShipment);
  } catch (err) {
    console.error("❌ Shipment creation failed:", err);
    res.status(500).json({ error: "Failed to create shipment" });
  }
};




exports.getAllShipments = async (req, res) => {
  const shipments = await Shipment.find().populate("supplier");
  res.json(shipments);
};
