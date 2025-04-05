import express from "express";
import { getAllProducts } from "../servers/productServes";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Something went wrong ! :)");
  }
});

export { router as productRouter };
