import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VAR } from './../db/ENV_VARS.js';

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies["netflix-cookie"]
        if(!token){
            return res.status(400).json({success:false, message:"Unauthorized No Token Provided"})
        }
        const decoded = jwt.verify(token,ENV_VAR.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({success:false, message:"Unauthorized Invalid Token"});
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        req.user = user;
        next()

    } catch (error) {
        console.log("Error in ProtectRoute middleware", error.message);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

