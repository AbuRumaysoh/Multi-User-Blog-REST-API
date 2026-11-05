import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routers/userRouter.js";
import postRoutes from "./src/routers/postRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", postRoutes);
app.use("/uploads", express.static("uploads"));

const database = process.env.databaseURL;
const connectDB = async () => {
    try {
        mongoose.connect(database)
    .then(() =>
        console.log("MongoDB Connected"))
    .catch((err) => console.log("Full error:", err))
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};   
connectDB();

app.listen(4040, ()=>{
    console.log("Server is running on port 4040");
})