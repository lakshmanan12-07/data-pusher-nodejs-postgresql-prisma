import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtTokenService } from "../services";
dotenv.config();

const generateAuthToken = async (userId: string) => {
  const authToken = jwt.sign(
    {
      userId,
      type: "AUTH_TOKEN",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "12hrs",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId,
      type: "REFRESH_TOKEN",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7days",
    }
  );

  await jwtTokenService.createJwtToken({
    user: { connect: { id: userId } },
    accessToken: authToken,
    refreshToken,
  });

  return {
    authToken,
    refreshToken,
  };
};

export default {
  generateAuthToken,
};
