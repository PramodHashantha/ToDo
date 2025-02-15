import express from "express";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.js";
import listRoute from "./routes/list.js";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/api/auth', authRoute);
app.use('/api/list', listRoute);


app.listen(8000, () => {
    connectDB();
    console.log("Server is running on port 8000");
});
