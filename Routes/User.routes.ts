import express from "express";
import { 
    registerUser,
    getMe,
    getUsers,
    createUserAdmin,
    updateUser,
    deleteUser
 } from "../Controllers/User.controller";

import { AsureAuth } from "../Middlewares/Authenticated";

const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./Uploads/avatar" });
const UserRoutes = express.Router();

UserRoutes.post("/user/register", registerUser);

UserRoutes.get("/user/me", [AsureAuth] , getMe);
UserRoutes.get("/users", [AsureAuth], getUsers);
UserRoutes.post("/user/create", [AsureAuth, md_upload], createUserAdmin); //rol admin
UserRoutes.patch("/user/:id",[AsureAuth, md_upload], updateUser);
UserRoutes.delete("/user/:id", [AsureAuth], deleteUser);

export{
    UserRoutes,
};