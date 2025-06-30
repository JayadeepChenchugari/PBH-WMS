const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locationController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllLocations);
router.get('/:id', authenticate, getLocationById);
router.post('/', authenticate, authorizeRoles('admin'), createLocation);
router.put('/:id', authenticate, authorizeRoles('admin'), updateLocation);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteLocation);

module.exports = router;
