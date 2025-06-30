const Notification = require('../models/Notification');

exports.getNotificationsByUser = async (req, res) => {
  const notifs = await Notification.find({ user: req.user.id });
  res.json(notifs);
};

exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.sendStatus(200);
};

exports.deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
