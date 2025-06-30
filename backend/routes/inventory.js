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
router.post('/', authenticate, authorizeRoles('admin','manager','operator'), createItem);
router.put('/:id', authenticate, authorizeRoles('admin','manager','operator'), updateItem);
router.delete('/:id', authenticate, authorizeRoles('admin','manager','operator'), deleteItem);

module.exports = router;
