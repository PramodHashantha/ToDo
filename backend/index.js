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

// CORS Configuration
const corsOptions = {
  origin: "https://to-do-client-phi.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // For legacy browser support
};

// Middleware - Remove the duplicate CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Handle OPTIONS requests (preflight) explicitly if needed
app.options('*', cors(corsOptions));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/list", listRoute);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
