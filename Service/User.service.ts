import boom from "boom";
import bcrypt from "bcryptjs";
const UserData = require('../Models/user.models');

export class UserService{

    async createNewUser(firstName:any, lastName:any, email:any, password:any){
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = new UserData({
           firstName,
           lastName,
           email: email.toLowerCase(),
           role: "user",
           active: true,
           password 
        });

        user.password = hashPassword;

        if(user != null){
            await user.save(); 
            return user;
        } else{
            return  boom.badRequest("Has been a error");
        }
        
    }

}