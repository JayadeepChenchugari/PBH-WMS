const express = require('express');
const router = express.Router();
const {
  getAllReturns,
  getReturnById,
  createReturn,
  updateReturnStatus
} = require('../controllers/returnController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllReturns);
router.get('/:id', authenticate, getReturnById);
router.post('/', authenticate, authorizeRoles('admin', 'operator'), createReturn);
router.put('/:id/status', authenticate, authorizeRoles('admin', 'operator'), updateReturnStatus);

module.exports = router;
