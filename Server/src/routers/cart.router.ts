import express from "express";
import { getActiveCartForUser } from "../servers/cartServes";
import validateJWT from "../middlewares/validateJWT";
const router = express.Router();

interface ExtendRequest extends express.Request {
  user?: any;
}
router.get("/", validateJWT, async (req: ExtendRequest, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user._id;

  const cart = await getActiveCartForUser({ userId });
  res.status(200).json(cart);
});

export { router as cartRouter };
