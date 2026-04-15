import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUsers = async () => {
  try {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/rolesync';
    await mongoose.connect(url);
    const count = await User.countDocuments();
    const users = await User.find().select('email role').limit(10);
    console.log(`Total users in DB: ${count}`);
    console.log('Sample users:', users);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUsers();
