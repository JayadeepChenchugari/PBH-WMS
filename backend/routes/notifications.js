const express = require('express');
const router = express.Router();
const {
  getNotificationsByUser,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');

const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, getNotificationsByUser);
router.put('/:id/read', authenticate, markAsRead);
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;
