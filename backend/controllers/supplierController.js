const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
};

exports.getSupplierById = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.json(supplier);
};

exports.createSupplier = async (req, res) => {
  const supplier = new Supplier(req.body);
  await supplier.save();
  res.status(201).json(supplier);
};

exports.updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(supplier);
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (supplier.active) {
      return res.status(400).json({ message: "Cannot delete an active supplier" });
    }

    await Supplier.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting supplier" });
  }
};
