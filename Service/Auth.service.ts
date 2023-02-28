import boom, { badRequest } from "boom";
import bcrypt from "bcryptjs";
import { Response } from "express";
const User = require('../Models/user.models');
import {
    createRefreshToken,
    createdAccessToken,
    decoder
} from "../Utils/jwt.utils"

export class UserServiceAuth{

    finUser(email: any, password: any) {

        const emailLowerCase = email.toLowerCase();
        
        User.findOne({ email: emailLowerCase }, (err: any, userStorage: any) => {
            if(err){
                throw boom.badRequest("Error of the server");
            } else{
                bcrypt.compare(password, userStorage.password, (bcryptErr: any, CheackUser: any) => {
                    if(bcryptErr){
                        throw boom.badRequest("Error of the server");
                    }else if(!CheackUser){
                        throw boom.badRequest("Error of the server");
                    } else if(!userStorage.active){
                        throw boom.badRequest("User not active");
                    }else{
                       return userStorage;
                    }
                })
             };
            
        });

    }
}
