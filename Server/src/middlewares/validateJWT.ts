import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";

interface ExtendRequest extends Request {
  user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).json("authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).json("bearer token not found");
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRT || '',
    async (error, payload) => {
      if (error) {
        res.status(403).json("Invalide token");
        return;
      }

      if (!payload) {
        res.status(403).json("Invalide token payload");
        return;
      }

      const userPayload = payload as {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
