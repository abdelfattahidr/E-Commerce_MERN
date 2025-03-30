import express from "express";
import {
  addProductToCart,
  deleteProductFromCart,
  getActiveCartForUser,
  updateProductToCart,
  clearCart,
} from "../servers/cartServes";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/express";
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;

  const cart = await getActiveCartForUser({ userId });
  res.status(200).json(cart);
});

router.post("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await addProductToCart({ userId, productId, quantity });
  res.status(response.statusCode).json(response.data);
});

router.put("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await updateProductToCart({ userId, productId, quantity });
  res.status(response.statusCode).json(response.data);
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const response = await deleteProductFromCart({ userId, productId });
    res.status(response.statusCode).json(response.data);
  }
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const response = await clearCart({ userId });
  res.status(response.statusCode).json(response.data);
});

export { router as cartRouter };
