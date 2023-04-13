const Courses = require("../Models/courses.models")
import {getFilePath}  from "../Utils/image.utils";
import {
    Request,
    Response,
    NextFunction
} from "express";


function CreateCourse(
    req: any,
    res: Response,
    next: NextFunction
) {
    try { 
        const course = new Courses(req.body);

        const imagePath = getFilePath(req.files.miniature);
        course.miniature = imagePath;
        

        course.save((err: any, courseStorage: any) => {
            if(err){
                res.status(400).send({ msg: "Has been a error" });
            }else{
                res.status(201).send({
                    Course: "Course created succesfully",
                    courseStorage,
                });
            }
        });

    } catch (error) {
        next(error)
    }
};

function getCourse( 
    req: Request,
    res: Response,
    next: NextFunction
) {
   try {

    const { page = 1, limit = 10 } = req.query;

    const options ={
        page: Number(page),
        limit: Number(limit)
    }
    Courses.paginate({}, options ,(err: any, curses: any)=>{
        if(err){
            res.status(400).send({ msg: "Has been a error" });
        }else{
            res.status(200).send(curses)
        }
    })

   } catch (error) {
    next(error)
   };
}

function updateCurse(
    req: any,
    res: Response,
    next: NextFunction 
){

    const { id } = req.params;
    const courseData = req.body;

    if(!courseData){
        res.status(400).send({ msg: "has been a error" });
    }

    if(req.files.miniature){
        const imagePath = getFilePath(req.files.miniature);

        courseData.miniature = imagePath;
    }

    Courses.findByIdAndUpdate({ _id: id }, courseData, (err: any, courseStorage: any) =>{
        if(err){
            res.status(400).send({ msg: "has been a error the update the course" });
        }else{
            res.status(400).json({ 
                Curse: "Curses updated",
            })
        }
    })

}

function DeleteCurse(  
    req: Request,
    res: Response,
    next: NextFunction
 ){
    try {
        
        const { id } = req.params;

            
            Courses.findByIdAndDelete({ _id: id }, (err:any)=> {
                if(err){
                    res.status(400).send({msg: "Has been a error"});
                }else{
                    res.status(200).json({ msgCourse: "Curse eliminated Sucessfully" })
                }
            })

    } catch (error) {
        next(error)
    }

}

    export {
        CreateCourse,
        getCourse,
        updateCurse,
        DeleteCurse
    };