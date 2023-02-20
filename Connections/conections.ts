//Importation of the libraries needed for the connection on database
import mongoose from "mongoose";
import { App } from "../App";
import Config from "../Config/DB.config";
import boom from "boom"


const Connection = () => {
    try{
        mongoose.set("strictQuery", false);

        //generating the connection on database
        mongoose.connect(`mongodb+srv://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}/`, (error) => {
            if(error) throw boom.badRequest("the database connection has not been established ", error)
            ;
        //Creating the Lintening Server
            App.listen(Config.PORT, () => {
                console.log("---------->Server Express Online<----------");
                console.log(`http://${Config.IP_SERVER}:${Config.PORT}/api/${Config.API_VERSION}`);
            })
        
        });
    }catch(err){
        throw boom.badRequest("Not has been the connection on the database", err);
    }

}

export {Connection};

