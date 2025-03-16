import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/user.router";

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

// test api
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// Students router
app.use("/users", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
