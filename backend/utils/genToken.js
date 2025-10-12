import jwt from "jsonwebtoken"
import { ENV_VAR } from "../db/ENV_VARS.js"

export const generateTokenAndSetCookie =(userId, res)=>{
    const Token = jwt.sign({userId}, ENV_VAR.JWT_SECRET, {expiresIn:"15d"})

    res.cookie("netflix-cookie",Token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:true,
        secure:ENV_VAR.NODE_ENV !== "development"
    });
    return Token;
}
