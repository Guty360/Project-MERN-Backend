import express from "express";
import { login, refreshAccessToken } from "../Controllers/Auth.controller";

const AuthRouther = express.Router();

AuthRouther.post("/auth/login", login);
AuthRouther.post("/auth/refresh_access_token", refreshAccessToken)

export {
    AuthRouther
};