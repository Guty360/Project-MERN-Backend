import express from "express";
import {
     CreateCourse,
     getCourse,
     updateCurse,
     DeleteCurse
     } from "../Controllers/Courses.controller";
const multiparty = require("connect-multiparty");
import {AsureAuth} from "../Middlewares/Authenticated";



const md_course = multiparty({ uploadDir: "./Uploads/course" });
const CourseRouter = express.Router();

CourseRouter.post("/course",[AsureAuth, md_course], CreateCourse);
CourseRouter.get("/courses",[AsureAuth], getCourse);
CourseRouter.patch("/courses/:id", [AsureAuth, md_course], updateCurse);
CourseRouter.delete("/courses/:id", [AsureAuth], DeleteCurse );

export{
    CourseRouter,
};