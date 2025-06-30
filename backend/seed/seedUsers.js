const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new User({
    name: 'Admin User',
    email: 'admin@wms.com',
    password: hashedPassword,
    role: 'admin',
  });

  await User.deleteMany();
  await admin.save();
  console.log('✅ Admin user created');
  process.exit();
};

seedAdmin();
