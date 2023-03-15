import express from "express";
import {
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostPath
} from "../Controllers/Post.controller";
import {AsureAuth} from "../Middlewares/Authenticated";
const multiparty = require("connect-multiparty");

const md_image = multiparty({ uploadDir: "./Uploads/postImage" })
const PostRouter = express.Router();

PostRouter.post("/post", [AsureAuth, md_image], createPost);
PostRouter.get("/post", getPost);
PostRouter.patch("/post/:id", [AsureAuth, md_image], updatePost);
PostRouter.delete("/post/:id", [AsureAuth], deletePost );
PostRouter.get("/post/:path", getPostPath)

export{
PostRouter
};