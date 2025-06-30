const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/inventoryController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllItems);
router.get('/:id', authenticate, getItemById);
router.post('/', authenticate, authorizeRoles('admin'), createItem);
router.put('/:id', authenticate, authorizeRoles('admin'), updateItem);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteItem);

module.exports = router;
