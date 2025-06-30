const express = require("express");
const router = express.Router();
const { createShipment, getAllShipments } = require("../controllers/shipmentController");

router.post("/incoming", createShipment);
router.get("/incoming", getAllShipments);

module.exports = router;
