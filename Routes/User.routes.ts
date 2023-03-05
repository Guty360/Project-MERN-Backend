import express from "express";
import { registerUser, getMe } from "../Controllers/User.controller";
import { AsureAuth } from "../Middlewares/Authenticated";

const UserRoutes = express.Router();


UserRoutes.post("/user/register", registerUser);
UserRoutes.get("/user/me", [AsureAuth], getMe);


export{
    UserRoutes,
};