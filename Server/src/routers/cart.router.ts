import express from "express";
import {
  addProductToCart,
  deleteProductFromCart,
  getActiveCartForUser,
  updateProductToCart,
  clearCart,
  checkout,
} from "../servers/cartServes";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/express";
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.post("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addProductToCart({ userId, productId, quantity });
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.put("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateProductToCart({ userId, productId, quantity });
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteProductFromCart({ userId, productId });
      res.status(response.statusCode).json(response.data);
    } catch (error) {
      res.status(500).json("Something went wrong ! :)");
    }
  }
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

export { router as cartRouter };
