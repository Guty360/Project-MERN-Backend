    //This is a element of express, for creation of API REST 
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import Config from "./Config/DB.config";

    const App = express();

    //import of the routes

    //configuration of Body parser: Esto hace que podamos enviar y recibir informacion del body y parsearlo 
    //a JSON
    App.use(bodyParser.urlencoded({ extended: true }));
    App.use(bodyParser.json());


    //Configure static folder
    App.use(express.static("Uploads"));

    //Configuration of CORS - HTTP HEADER, Esto nos permite gestionar las rutas de acceso con cors
    App.use(cors());


    //Configuration of routings of access

export {App};