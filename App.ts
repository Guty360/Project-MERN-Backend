    //This is a element of express, for creation of API REST 
    
    import express from "express"
    import Config from "./Config/DB.config";

    const App = express();

    //import of the routes

    //configuration of Body parser: Esto hace que podamos enviar y recibir informacion del body y parsearlo 
    //a JSON

    //Configuration of CORS - HTTP HEADER, Esto nos permite gestionar las rutas de acceso con cors

    //Configuration of routings of access

export {App};