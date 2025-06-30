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
router.post("/", authenticate, authorizeRoles("admin",'operator','manager'), createSupplier);
router.put("/:id", authenticate, authorizeRoles("admin",'operator','manager'), updateSupplier);
router.delete("/:id", authenticate, authorizeRoles("admin",'operator','manager'), deleteSupplier);

module.exports = router;
