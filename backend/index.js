import express from "express";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.js";
import listRoute from "./routes/list.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Dynamically allow multiple origins
const allowedOrigins = process.env.CLIENT_URL.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Explicitly handle OPTIONS requests
app.options("*", cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/list", listRoute);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Vercel
export default app;