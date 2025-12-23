import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL)
      .then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("Database Connected");
  return cached.conn;
}

export default connectDB;
