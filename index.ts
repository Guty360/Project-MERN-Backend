import mongoose from "mongoose";
import Config from "../Project-MERN-Backend/Config/ConstansDB.config"

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}/`, (error)=> {
        if(error) throw error;
        
        console.log("Conection on DataBase has been sucesfully!")
}) 