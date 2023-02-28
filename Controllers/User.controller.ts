import { Response, Request, NextFunction } from "express";
import { User } from "../Service/user.service";

const userDataService = new User();

const registerUser = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const {firstName, lastName, email, password} = req.body;

        if(!email) res.status(400).send({ msg: "El email es obligatorio" });
        if(!password) res.status(400).send({ msg: "La contraseña es obligatoria" });      
        
        const sendUser = await userDataService.createUser(firstName, lastName, email, password)

        if(sendUser != null){
            res.status(200).json({
                message: "User created",
                sendUser,
            });  
        } else {
            throw res.status(400).send({ msg: "Has been a error" });
        }
    }catch(err){
        next(err)
    }
}

export{
    registerUser,
};