import { Response, Request, NextFunction, response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../Service/user.service";
import { getFilePath } from "../Utils/image.utils";
const User = require("../Models/user.models");


const userDataService = new UserService();

// Obtain one user for ID on token authenticated
async function getMe(
    req: any,
    res: Response,
    next: NextFunction
) {
    try{
        const {user_id} = req.user;
        
        const response = await User.findById(user_id);

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

        if(active === undefined){
            response = await User.find();
        }else{
            response = await User.find({ active })
        }
        res.status(200).send(response);
    }catch(err){
        next(err);
    }
}

// this function is only for people on rol admin in the future
async function createUserAdmin(
    req: any,
    res: Response,
    next: NextFunction
){

    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    

    const user = new User({ 
        ...req.body, active: false, password: hashPassword
    })

    if(req.files.avatar){
      const imagePath = getFilePath(req.files.avatar);  
        user.avatar = imagePath; 
    }

    user.save((err: any, userStorage: any) => {
        if(err){
            res.status(500).send({ msg: "Error to created user"});
        }else{
            res.status(200).json({ msg: "User created sucessfully", userStorage });
        }
    });
     
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

async function updateUser(
    req: any,
    res: Response,
    next: NextFunction
){
    const { id } = req.params;
    const userData = req.body;

        if(userData.password){
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(userData.password, salt);

            userData.password = hashPassword;
        } else {
            delete userData.password;
        }

        if(req.files.avatar){
            const filePath = getFilePath(req.files.avatar);
            userData.avatar = filePath;
        }
        
        
    User.findByIdAndUpdate({ _id: id }, userData, (err: any) => {
       if(err){
        res.status(400).send({ msg: "Error updating user" });
       } else {
        res.status(200).send({ msg: "User Updated" });
       }
    });
}

async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    
    User.findByIdAndDelete({ _id: id }, (error: any) => {
        if(error){
            res.status(400).send({ msg: "Error deleting user" });
        } else{
            res.status(200).send({ msg: "User eliminated" });
        }
    })
    
}

export{
    registerUser,
    getMe,
    getUsers,
    createUserAdmin,
    updateUser,
    deleteUser
};