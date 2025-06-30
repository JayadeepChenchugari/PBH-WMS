const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/', authenticate, authorizeRoles('admin', 'operator'), createOrder);
router.put('/:id/status', authenticate, authorizeRoles('admin', 'operator'), updateOrderStatus);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteOrder);

module.exports = router;
