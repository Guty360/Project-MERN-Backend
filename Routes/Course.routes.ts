import express from "express";
import {
EnvioCourse
} from "../Controllers/Courses.controller";
import {AsureAuth} from "../Middlewares/Authenticated";
const multiparty = require("connect-multiparty");


const CourseRouter = express.Router();
const md_miniature = multiparty({ uploadDir: "/Uploads/course" });

CourseRouter.get("/course",[AsureAuth], EnvioCourse);

export{
    CourseRouter
};