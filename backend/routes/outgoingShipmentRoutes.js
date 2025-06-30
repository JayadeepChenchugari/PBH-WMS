const express = require("express");
const router = express.Router();
const { createOutgoingShipment, getOutgoingShipments } = require("../controllers/outgoingShipmentController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, createOutgoingShipment);
router.get("/", authenticate, getOutgoingShipments);

module.exports = router;
