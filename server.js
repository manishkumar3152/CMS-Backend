import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

/* =======================
   CORS CONFIG (HERE 👇)
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://csm-frontend-eight.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔥 REQUIRED for preflight
app.options("*", cors());

/* =======================
   BODY PARSER
======================= */
app.use(express.json());

/* =======================
   CONNECT DB (SERVERLESS SAFE)
======================= */
await connectDB();
connectCloudinary();

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

/* =======================
   ROUTES
======================= */
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

export default app;
