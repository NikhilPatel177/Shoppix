import mongoose from 'mongoose';
import { env } from './env';

export async function connectDb() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('✅ Db connected(MongoDb with mongoose orm)');
  } catch (error) {
    console.log('❌ Db connection error :-', error);
    process.exit(1);
  }
}
