const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deactivateUser,
  deleteUser
} = require('../controllers/userController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorizeRoles('admin'), getAllUsers);
router.get('/:id', authenticate, authorizeRoles('admin'), getUserById);
router.put('/:id/role', authenticate, authorizeRoles('admin'), updateUserRole);
router.put('/:id/deactivate', authenticate, authorizeRoles('admin'), deactivateUser);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser);

module.exports = router;
