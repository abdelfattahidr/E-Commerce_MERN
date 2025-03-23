import { userModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({
    email,
  });

  if (findUser) {
    return { data: "User already exists", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return {
    data: genereateJWT({ firstName, lastName, email }),
    statusCode: 200,
  };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    return { data: "Incorrect email or password", statusCode: 400 };
  }

  const passwordMatch = (await bcrypt.compareSync(
    password,
    user.password
  )) as boolean;

  if (passwordMatch) {
    return {
      email,
      data: genereateJWT({
        firstName: user.firstName,
        lastName: user.lastName,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or password", statusCode: 400 };
};

const genereateJWT = (data: any) => {
  return jwt.sign(
    data,
    "9X0BFeDWA5Z6LBFp0Y81AXkUrT7dfHEsvV1ebygdOCMKqNvNSwY3snbCRF83fLoN"
    // ,{ expiresIn: "24h" }
  );
};
