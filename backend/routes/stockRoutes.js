const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", authenticate, authorizeRoles("admin", "manager"), stockController.createStockMovement);
router.get("/", authenticate, stockController.getStockMovements);

module.exports = router;
