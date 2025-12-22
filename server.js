// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

// Middleware FIRST
app.use(express.json());
app.use(cors());

// Health check (IMPORTANT)
app.get("/api", (req, res) => {
  res.status(200).json({ success: true, message: "API WORKING" });
});

// Connect services safely
(async () => {
  try {
    await connectDB();
    connectCloudinary();
  } catch (error) {
    console.error("Startup error:", error.message);
  }
})();

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

export default app;
