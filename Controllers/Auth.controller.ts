import { Response, Request, NextFunction, response } from "express";
import { UserServiceAuth } from "../Service/Auth.service";
import {
createRefreshToken,
createdAccessToken,
decoder
} from "../Utils/jwt.utils"
const User = require('../Models/user.models');
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

const userService = new UserServiceAuth();

function login(
    req: Request,
    res: Response,
    next: NextFunction)
    {
        const {email, password} = req.body;

        if(!email)res.status(400).send({ msg: "The email is obligate" });
        if(!password)res.status(400).send({ msg: "The password is obligate" });

        const emailLowerCase = email.toLowerCase();

        // const valor = userService.finUser(email, password);
        // console.log(valor);
        
        //search a one user and incrypt the information of user
        //generating a accesstoken y refreshtoken
        User.findOne({ email: emailLowerCase }, (error: any, userStorage:any) =>{
            if(error){
                res.status(400).send({ msg: "Error of server" })
            }else{
                bcrypt.compare(password, userStorage.password, (bcryptErr: any, cheack: any) =>{
                    if(bcryptErr){
                        res.status(500).send({ msg: "Error of the server" });
                    }else if(!cheack){
                        res.status(500).send({ msg: "Error of the server" });
                    } else if(!userStorage.active){
                        res.status(401).send({ msg: "User not active" })
                    }else{
                        res.status(200).send({
                            access: createdAccessToken(userStorage),
                            refresh: createRefreshToken(userStorage),
                        })
                    }
                })
            }
        })
    }

function refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
){
    // {
    //     interface jwtpayload{
    //         user_id: string;
    //     }
    // }
    try{
        const {token} = req.body;

        if(!token) res.status(400).send({ msg: "Token requerido" })
    
        const { user_id } = decoder(token) as JwtPayload
    
        User.findOne({ _id: user_id }, (err: any, userStorage: any) => {
            if(err){
                res.status(500).send({ msg: "Error of the server" });
            }else {
                res.status(200).send({ 
                    accessToken: createdAccessToken(userStorage),
                 })
            }
        });
    }catch(err){
        next(err)
    }

}

export {
    login,
    refreshAccessToken,
};