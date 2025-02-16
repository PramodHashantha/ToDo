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


app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://to-do-client-phi.vercel.app" || "*",
    credentials: true,
  })
);

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