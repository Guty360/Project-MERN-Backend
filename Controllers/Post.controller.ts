const Post = require("../Models/post.models");
import { Request, Response, NextFunction } from "express";
import { getFilePath } from "../Utils/image.utils"

function createPost(
    req: any,
    res: Response,
    next: NextFunction
){

    try {
        
        const post = new Post(req.body);
        post.create_at = new Date();
        
        if(req.files.miniaturePost){
            const imagePath = getFilePath(req.files.miniaturePost);
            post.miniaturePost = imagePath;
        }

        post.save((error: any, postStorage: any) => {
            if(error){
                res.status(400).send({ msg: " has been a error to create post" });
            }else{
                res.status(200).json({
                    msg: "Post Created sucessfully",
                    Post: postStorage
                });
            }
        })


    } catch (error) {
        next(error);
    }

}


async function getPost(
    req: Request,
    res: Response,
    next: NextFunction
) {
    
    try {
    
        const { page = 1, limit = 10 } = req.query;

        const options ={
            page: Number(page),
            limit: Number(limit),
            sort: { create_at: "desc" },
        }

        Post.paginate({}, options, (err: any, postStorage: any)=>{
            if(err){
                res.status(400).send("has been a error");
            }else{
                res.status(200).send(postStorage)
            }
        });

    } catch (error) {
        next(error)
    }

}

function updatePost(
    req: any,
    res: Response,
    next: NextFunction
){
    const { id } = req.params;
    const data = req.body;

    if(!data){
        res.status(400).send({ msg: "has been a error" });
    }

    if(req.files.miniaturePost){
        const imagePath = getFilePath(req.files.miniaturePost);
        data.miniaturePost = imagePath
    }

    Post.findByIdAndUpdate({ _id: id }, data,(err: any)=>{
        if(err){
            res.status(400).send({msg: "has been a error to update post"});
        }else{
            res.status(200).send({ msg: "Post updated" });
        }
    });
}

function getPostPath(
    req: Request,
    res: Response,
    next: NextFunction
){

    try {
      
        const { path } = req.params
        
        Post.findOne({ path: path }, (err: any, postStorage: any) => {
            if(err){
                res.status(500).send({ msg:"has been a error"});
            }else if(postStorage === null){
                res.status(500).send({ msg:"has been a error, Post empty"});
            }else{
                res.status(200).send({ Post: postStorage })
            }
        })
    } catch (error) {
        next(error);
    }


}


function deletePost(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const { id } = req.params;

        Post.findByIdAndDelete({ _id: id }, (err: any)=>{
            if(err){
                res.status(400).send({msg: "has been a error to delete post"});
            }else{
                res.status(200).send({ msg: "Post deleted" });
            }
        })


    } catch (error) {
        next(error)
    }
}

export{
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostPath
};