import { Request, Response } from "express";
import tokenUtils from "../config/token.utils";
import jwt from "jsonwebtoken";
import { userService } from "../services";
import passwordUtils from "../config/password.utils";
import axios from "axios";
import { emit } from "process";

const userLogin = async function (req: Request, res: Response) {
  try {
    const checkUser = await userService.getUserByFilter({
      email: req.body.email,
    });
    if (!checkUser)
      return res.status(400).send({
        code: 404,
        message: "User not found",
      });

    if (
      !(await passwordUtils.verifyPasswordHash(
        req.body.password,
        checkUser.password
      ))
    )
      return res.status(400).send({
        code: 400,
        message: "Enter a valid password",
      });
    const tokens = await tokenUtils.generateAuthToken(checkUser.id);

    return res.status(200).send({
      code: 200,
      data: {
        user: {
          id: checkUser.id,
          email: checkUser.email,
          createdAt: checkUser.createdAt,
        },
        tokens,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const generateAuthToken = async function (req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const tokens = await tokenUtils.generateAuthToken((decoded as any).userId);

    return res.status(200).send({
      message: "success",
      data: {
        tokens,
      },
    });
  } catch (error: any) {
    return res.status(401).send({ message: error.message });
  }
};

const userRegister = async function (req: Request, res: Response) {
  const checkUser = await userService.getUserByFilter({
    email: req.body.email,
  });
  if (checkUser)
    return res.status(400).send({
      code: 400,
      message: "User already found",
    });

  const password = await passwordUtils.generatePasswordHash(req.body.password);
  if (!password)
    return res.status(400).send({
      code: 400,
      message: "Error While encrypting password",
    });

  const createdUser = await userService.createUser({
    email: req.body.email,
    password,
  });
  return res.status(200).send({
    code: 200,
    data: {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      },
    },
  });
};

export default {
  userLogin,
  generateAuthToken,
  userRegister,
};
