import express from "express";
import { registerUser } from "../Controllers/User.controller";

const UserRoutes = express.Router();

UserRoutes.post("/user/register", registerUser);

export{
    UserRoutes,
};