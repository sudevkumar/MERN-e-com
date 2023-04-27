import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import catRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import cors from "cors";


// configure env

dotenv.config();

// database configuration

connectDb();

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", catRouter);
app.use("/api/v1/product", productRouter);

// Rest Api
app.get("/", (req, res) => {
  res.send("Hii Users");
});

// Port number
const port = process.env.PORT || 8080;

// Run Server Process
app.listen(port, () => {
  console.log(`Server Running on ${port}`.bgWhite.green);
});
