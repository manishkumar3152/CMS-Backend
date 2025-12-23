import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connections

  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  await mongoose.connect(process.env.MONGODB_URL);

  isConnected = true;
};

export default connectDB;