import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const checkManagers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Realtime');
    console.log('Connected to MongoDB');

    const managers = await User.find({ role: 'manager' });
    console.log(`Found ${managers.length} managers:`);
    managers.forEach(m => {
      console.log(`- ${m.name} (${m.email})`);
    });

    const all = await User.find({});
    console.log(`Total users: ${all.length}`);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkManagers();
