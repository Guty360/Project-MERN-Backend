import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import {
decoder
} from "../Utils/jwt.utils"

function AsureAuth(
    req: Request,
    res: Response,
    next: NextFunction
    ){

    if(!req.headers.authorization){
        return res
        .status(403).send({msg: "Server header sending error"});
    }
   
    const token = req.headers.authorization.replace("Bearer", "");
    
    try {    
        const payload = decoder(token);
        const { exp = 0 } = payload as JwtPayload;
                
        const currentData = new Date().getTime();
        
        if(exp <= currentData){
            return res.status(400).send({ msg: "The token has been finalizated" })
        }
        // retornas un usuario en base al token siempre y cuando cumpla con la condicion
        req.body = payload; 
        next();
        
    } catch (err) {
     return res.status(400).send({ msg: "Invalid token" })
    }
}

export {
    AsureAuth,
}
