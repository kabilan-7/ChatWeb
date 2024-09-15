import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const maxage = 3*24*60*60*1000
const createToken = (email,userId)=>{
  return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxage})
}
export const signup = async(req,res,next)=>{
  try{
   const {email,password} = req.body
   if(!email || !password){
    return res.status(400).send("")
   }
   const user = await User.create({email,password}) 
   res.cookie("jwt",createToken(email,user.id),{
    maxage,
    secure:true,
    sameSite:"None",
   })
   return res.status(201).json({
    user:{
      id:user.id,
      email:user.email,
      profileSetup:user.profileSetup,
    },
   })
  }catch(err){
     console.log({err})
     res.status(500).send("Internal server error")
  }
}
export const login = async (req,res,next)=>{
  try{
    const {email,password} = req.body
    if(!email || !password){
     return res.status(400).send("Email and Password are required")
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).send("User with given email not found")
    }
    const auth = await bcrypt.compare(password,user.password)
    if(!auth){
      return res.status(400).send("Password is incorrect")
    }
    res.cookie("jwt",createToken(email,user.id),{
     maxage,
     secure:true,
     sameSite:"None",
    })
    return res.status(200).json({
     user:{
       id:user.id,
       email:user.email,
       profileSetup:user.profileSetup,
       firstName:user.firstName,
       lastName:user.lastName,
       image:user.image,
       color:user.color
     },
    })
   }catch(err){
      console.log({err})
      res.status(500).send("Internal server error")
   }
}
export const getUserInfo = async (req,res,next)=>{
  try{
    const userData = await User.findById(req.userId)
    console.log(userData)
    if(!userData){
      return res.status(404).send("User with given id not found")
    }
    return res.status(200).json({
       id:userData.id,
       email:userData.email,
       profileSetup:userData.profileSetup,
       firstName:userData.firstName,
       lastName:userData.lastName,
       image:userData.image,
       color:userData.color
    })
   }catch(err){
      console.log({err})
      res.status(500).send("Internal server error")
   }
}
