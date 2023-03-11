const Course = require("../Models/courses.models");
import {
    Request,
    Response,
    NextFunction
} from "express";


async function EnvioCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        
        res.status(200).json({ msg: "This is a course" })


    } catch (error) {
        next(error)
    }
};

export {
EnvioCourse
};