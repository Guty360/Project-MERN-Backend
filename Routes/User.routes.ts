import express from "express";
import { registerUser, getMe, getUsers, createUser } from "../Controllers/User.controller";
import { AsureAuth } from "../Middlewares/Authenticated";

const UserRoutes = express.Router();


UserRoutes.post("/user/register", registerUser);

UserRoutes.get("/user/me", [AsureAuth], getMe);
UserRoutes.get("/users", [AsureAuth], getUsers);
UserRoutes.post("/user/create", [AsureAuth], createUser); //rol admin


export{
    UserRoutes,
};