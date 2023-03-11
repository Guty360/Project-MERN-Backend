import express from "express";
import {
CreateMenuBase,
getMenu,
updateMenu,
deleteMenu
} from "../Controllers/Menu.Controller";
import { AsureAuth } from "../Middlewares/Authenticated";
const multiParty = require ("connect-multiparty")

const MenuRouter = express.Router();
const md_party = multiParty();

//Rutas o EndPoint
MenuRouter.post("/menu", [AsureAuth] ,CreateMenuBase);
MenuRouter.get("/menus", getMenu);
MenuRouter.patch("/menu/:id", [AsureAuth, md_party] , updateMenu);
MenuRouter.delete("/menu/:id", [AsureAuth], deleteMenu)

export {
    MenuRouter
};