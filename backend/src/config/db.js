import mongoose from "mongoose";


async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb://admin:password@reactdemo-mongodb:27017/reactdemo?authSource=admin"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}




export default connectDB;
