const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getTransactionsByItem,
  recordTransaction
} = require('../controllers/transactionController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllTransactions);
router.get('/item/:itemId', authenticate, getTransactionsByItem);
router.post('/', authenticate, authorizeRoles('admin', 'operator'), recordTransaction);

module.exports = router;
