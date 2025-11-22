import mongoose from "mongoose";
import { DB_URI } from "../env.js";



if(!DB_URI){
    throw new Error("please define the mongodb url");
}

const connetToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to database");
        
    } catch (error) {
        console.log('error connecting to database', error);
        
    }
}

export default connetToDatabase