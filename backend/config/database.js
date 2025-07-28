import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error on the mongodb connecetion:', error.message, conn.connection.host);
    process.exit(1);
  }
};

export default connectDB;