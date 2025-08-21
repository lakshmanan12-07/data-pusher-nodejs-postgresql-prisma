import express from "express";
import userAuthRoute from "./user.auth.route";
import taskRoute from "./task.route";

const appRoute = express.Router();

appRoute.use("/user-auth", userAuthRoute);
appRoute.use("/task", taskRoute);

export default appRoute;
