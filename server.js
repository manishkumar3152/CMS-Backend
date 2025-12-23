import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

import Doctor from "./models/doctorModel.js"; // import your doctor model

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

// TEST endpoint to check MongoDB connection
app.get("/api/test-db", async (req, res) => {
  try {
    await connectDB(); // ensure DB is connected
    const doctors = await Doctor.find({});
    res.status(200).json({
      success: true,
      message: "Connected to MongoDB successfully",
      doctorsCount: doctors.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to connect to MongoDB",
      error: err.message,
    });
  }
});

// connect services safely (serverless)
(async () => {
  try {
    await connectDB();
    connectCloudinary();
    console.log("Services initialized");
  } catch (err) {
    console.error("Startup error:", err.message);
  }
})();

// routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

export default app;
