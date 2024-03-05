import mongoose from 'mongoose';


const connectDB = async (): Promise<void> => {
  try {
    console.log(process.env.NODE_ENV);
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Removed color formatting
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
