//This is a element of Moongose for the connection DB
import mongoose from "mongoose";
import Config from "./Config/DB.config";
import { App } from "./App";
import {Connection} from "./Connections/conections";


//---------------> Se creo la conexion de la base de datos en otro archivo para dejar limpio el index y con menos
// carga de codigo <----------------


// mongoose.set('strictQuery', true);

// //generating the connection on database
// mongoose.connect(`mongodb+srv://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}/`, (error)=> {
//     if(error) throw error;
    
    
//     App.listen(Config.PORT, ()=>{
//         console.log("---------->Server Express Online<----------");
//         console.log(`http://${Config.IP_SERVER}:${Config.PORT}/api/${Config.API_VERSION}`)
//     })
// });

Connection();




