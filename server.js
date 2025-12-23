import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

// middleware FIRST
app.use(express.json());
app.use(cors());

// health check (IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING"
  });
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
