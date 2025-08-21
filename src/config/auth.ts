import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  type: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const type = (decoded as JwtPayload).type;
    (req as CustomRequest).userId = (decoded as JwtPayload).userId;

    if (type == "REFRESH_TOKEN" && !req.originalUrl.includes("refresh-token"))
      return res.status(401).send({ message: "unauthorized" });

    next();
  } catch (error: any) {
    return res.status(401).send({ message: error.message });
  }
};

