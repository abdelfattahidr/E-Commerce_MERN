import express from "express";
import { addProductToCart, getActiveCartForUser } from "../servers/cartServes";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/express";
const router = express.Router();

router
  .get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;

    const cart = await getActiveCartForUser({ userId });
    res.status(200).json(cart);
  })
  .post("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addProductToCart({ userId, productId, quantity });
    res.status(response.statusCode as number).json(response.data);
  });

export { router as cartRouter };
