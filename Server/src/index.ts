import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/user.router";
import { productRouter } from "./routers/product.router";
import { seedinitialProducts } from "./servers/productServes";
import { cartRouter } from "./routers/cart.router";
import  cors from "cors";

dotenv.config();
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// seed products to database
seedinitialProducts();

// test api
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// app routers
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
