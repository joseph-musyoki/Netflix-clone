
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/genToken.js";


export const signup = async(req,res)=>{
        try {
           const { username, email, password } = req.body;
           if(!email || !password || !username){
                return res.status(400).json({success:false,message:"All fields are required"});
           }
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

           if(!emailRegex.test(email)){
                return res.status(400).json({success:false,message:"enter a valid email"})
           }    
           if(password.length < 6){
                return res.status(400).json({success:false,message:"password should be more than 6 characters"})
           }   
           const existingUserByEmail = await User.findOne({email:email}) 
           if(existingUserByEmail){
                return res.status(400).json({success:false,message:"Email already exists"})
           } 
           const existingUserByUsername = await User.findOne({username:username}) 
           if(existingUserByUsername){
                return res.status(400).json({success:false,message:"Username is already taken"})
           }
           const salt = await bcryptjs.genSalt(10)
           const hashedPassword = await bcryptjs.hash(password,salt)

           const PROFILE_PIC = ["/avatar1.png","/avatar2.png","/avatar3.png"]      
           const image = PROFILE_PIC[Math.floor(Math.random()*PROFILE_PIC.length)];
           const newUser = new User({
                email:email,
                username:username,
                password:hashedPassword,
                image:image
           })
           await newUser.save()
                generateTokenAndSetCookie(newUser._id,res);
           return res.status(200).json({success:true,User:{
                ...newUser._doc,
                password:""
           }})
           
        } catch (error) {
                console.log(error.message);
                res.status(500).json({success:false,message:"internal server error"})  
        }
}
export const login = async(req,res)=>{
        try {
                const { email, password } =req.body;
                if(!email || !password){
                        return res.status(400).json({success:false, message:"All fields are required"});
                }
                const user = await User.findOne({email:email})
                if(!user){
                        return res.status(400).json({success:false, message:"Invalid credentials"})
                }
                const isPasswordCorrect = await bcryptjs.compare(password,user.password);
                if(!isPasswordCorrect){
                     return res.status(400).json({success:false, message:"Invalid credentials"})   
                }
                generateTokenAndSetCookie(user._id,res)
                res.status(200).json({success:true,User:{
                ...user._doc,
                password:""
           }});
        } catch (error) {
                console.log(error.message);
                res.status(500).json({success:false,message:"Internal server error"})
        }

}
export const logout = async(req,res)=>{
        try {
                res.clearCookie("netflix-cookie");
                res.status(200).json({success:true,message:"logout successful"})      
        } catch (error) {
                console.log(error.message);
                
                res.status(500).json({success:false,message:"Internal server error"})
        }
}
export const authCheck = async (req,res) => {
        try {
                console.log("req.user:",req.user);
                res.status(200).json({success:true, user:req.user})
        } catch (error) {
                console.log("error in getting auth user ", error.message);
                res.status(500).json({success:false, message:"Internal Server error"})
        }
}