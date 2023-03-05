import { Response, Request, NextFunction, response } from "express";
import { User } from "../Service/user.service";
const userSearch = require("../Models/user.models")


const userDataService = new User();

// Obtain one user for ID on token authenticated
async function getMe(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        const {user_id} = req.body;
        
        const response = await userSearch.findById(user_id);

        if(!response){
            res.status(400).send({msg: "User not found"});
        }else{
            res.status(200).send(response);
        }
    }catch(err){
        next(err);
    }
}
// Obtain get users, all, active = true, active = false on token authenticated
async function getUsers(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{
        const { active } = req.query;
        let response = null;

        console.log(active);
        

        if(active === undefined){
            response = await userSearch.find();
        }else{
            response = await userSearch.find({ active })
        }
        res.status(200).send(response);
    }catch(err){
        next(err);
    }
}

// this function is only for people on rol admin in the future
async function createUser(
    req: Request,
    res: Response,
    next: NextFunction
){
   
}

// Register the firts user
const registerUser = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const {firstName, lastName, email, password} = req.body;

        if(!email) res.status(400).send({ msg: "El email es obligatorio" });
        if(!password) res.status(400).send({ msg: "La contraseña es obligatoria" });      
        
        const sendUser = await userDataService.createNewUser(firstName, lastName, email, password)

        if(sendUser != null){
            res.status(200).json({
                message: "User created",
                sendUser,  
            });  
        } else {
            throw res.status(400).send({ msg: "Has been a error" });
        }
    }catch(err){
        next(err);
    }
}

export{
    registerUser,
    getMe,
    getUsers,
    createUser,
};