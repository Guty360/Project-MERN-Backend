const Menu = require("../Models/menu.models");
import boom from "@hapi/boom"
import { Response, Request, NextFunction } from "express";


function CreateMenuBase(
    req: Request,
    res: Response,
    next: NextFunction,
){
    try{
        const menu = new Menu(req.body);
        menu.save({}, (err: any, MenuStorage: any) => {
            if(err){
                res.status(400).send({ msg: "Error to created the menu" });
            }else{
                res.status(200).send({ MenuStorage })
            }
            
        });
    } catch(err) {
        next(err);
    }  
}

async function getMenu(
    req: Request,
    res: Response,
    next: NextFunction
){

    try {
        
        const { active } = req.query;
        var response = null;
       

        if(active === undefined){
            response = await Menu.find().sort({ order: Menu.order });
        }else{
            response = await Menu.find({ active }).sort({ order: Menu.order });
        }
        if(response !== null){
            res.status(200).send({ Menu: response }) 
        }else{
            res.status(400).send({ msg: "Error of server" })
        }


    } catch (error) {
        next(error)
    }
}

async function updateMenu(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        
        const { id } = req.params;
        const MenuStorage = req.body;

            Menu.findByIdAndUpdate({ _id: id }, MenuStorage, (err: any) => {
                if(err){
                    res.status(400).send({ msg: "Error to Update menu" });
                }else{
                   res.status(200).send({
                     msg: "Updated menu",
                 });
                }
            });

    } catch (error) {
        boom.badRequest("Error of server")
        next(error);
    }
}

async function deleteMenu(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        
        const { id } = req.params;

            Menu.findByIdAndDelete({ _id: id}, (err: any) =>{
                if(err){
                    res.status(400).send({msg: "error to at elimiate a menu"});
                }else {
                    res.status(200).send({ msg: "Menu eliminated sucessfully" });
                }
            }); 
       

    } catch (error) {
        next(error);
    }
}

export {
    CreateMenuBase,
    getMenu,
    updateMenu,
    deleteMenu  
};
