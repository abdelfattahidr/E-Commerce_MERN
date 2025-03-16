import express from "express";
import { getAllProducts } from "../servers/productServes";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json(products);
});

export { router as productRouter };