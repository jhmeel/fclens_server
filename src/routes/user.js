import express from "express";
import { register, getAllEnrollee } from "../handlers/user.js";
const UserRouter = express();

UserRouter.route("/api/v1/register").post(register);
UserRouter.route("/api/v1/get-enrollee").get(getAllEnrollee);

export default UserRouter;
