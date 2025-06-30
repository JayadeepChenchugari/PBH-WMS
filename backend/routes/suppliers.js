const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require("../controllers/supplierController");

const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", authenticate, getAllSuppliers);
router.get("/:id", authenticate, getSupplierById);
router.post("/", authenticate, authorizeRoles("admin"), createSupplier);
router.put("/:id", authenticate, authorizeRoles("admin"), updateSupplier);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteSupplier);

module.exports = router;
