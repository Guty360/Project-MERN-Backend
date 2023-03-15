const newsletter = require("../Models/newsletter.models");
import { Response, Request, NextFunction } from "express";

function suscribEmail(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        
        const { email } = req.body;

        if(!email){
            res.status(201).send({msg: "email is required"})
        } else{
            const newletter = new newsletter({ 
                // email: req.body.email.toLowerCase() 1° Opcion
                email: email // 2° opcion
            })
    
            newletter.save((err: any) => {
                if(err){
                    res.status(400).send({msg: "has been a error, email duplicated"});
                }else{
                    res.status(200).json({ msg: "Email registered" })
                }
            })
        }

    } catch (error) {
        next(error);
    }
}

function getsEmail(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        
        const { page= 1, limit = 10 } = req.query;

        const options = {
            page: Number(page),
            limit: Number(limit),
            sort: "asc"
        }

        newsletter.paginate({}, options, (err: any, emailPaginate: string) => {
            if(err){
                res.status(400).send({ msg: "Has been a error" });
            }else{
                res.status(200).send({ Emails: emailPaginate })
            }
        })


    } catch (error) {
        next(error)
    }
}

function deleteEmail(
    req: Request,
    res: Response,
    next: NextFunction
){
try {
    
    const {id} = req.params

    newsletter.findByIdAndDelete({ _id: id }, (err: any) => {
        if(err){
            res.status(400).send({msg: "has been a error, id invalid"});
        }else{
            res.status(200).json({ msg: "Email eliminated" });
        }
        
    });

} catch (error) {
    next(error)
}


}



export{
    suscribEmail,
    getsEmail,
    deleteEmail
}