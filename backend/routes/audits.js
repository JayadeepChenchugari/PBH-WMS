const express = require('express');
const router = express.Router();
const {
  getAuditLogs,
  getLogsByUser,
  getLogsByAction
} = require('../controllers/auditController');

const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorizeRoles('admin'), getAuditLogs);
router.get('/user/:userId', authenticate, authorizeRoles('admin'), getLogsByUser);
router.get('/action/:action', authenticate, authorizeRoles('admin'), getLogsByAction);

module.exports = router;
