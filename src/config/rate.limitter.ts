import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: false,
  message: {
    code: httpStatus.TOO_MANY_REQUESTS,
    message: "Please try again later. you have reached the limit.",
  },
});
