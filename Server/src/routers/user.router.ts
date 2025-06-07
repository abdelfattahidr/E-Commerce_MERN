import express from "express";
import { getmyorders, login, register } from "../servers/userServes";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

router.get("/orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { statusCode, data } = await getmyorders({ userId });
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json("Something went wrong ! :)");
  }
});

export { router as userRouter };
