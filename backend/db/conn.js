import mongoose from "mongoose";
import { ENV_VAR } from "./ENV_VARS.js";

export const connection = async () => {
    try {
        const conn = await mongoose.connect(ENV_VAR.MONGO_URI)
        console.log("MongoDB connected " + conn.connection.host);
        
    } catch (error) {
        console.log("Error in connecting MongoDB"+error.message);
        process.exit(1);
      
        
    }
    
}

