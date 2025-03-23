import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/user.router";
import { productRouter } from "./routers/product.router";
import { seedinitialProducts } from "./servers/productServes";
import { cartRouter } from "./routers/cart.router";

const app = express();
const PORT = 3001;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/store")
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
