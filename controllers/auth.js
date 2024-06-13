import { validationResult } from "express-validator"
import UserSchema from "../models/user.js"
import tokenSchema from "../models/token.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import token from "../models/token.js"
import { sendMail } from "../helpers/email_sender.js"
import user from "../models/user.js"

const ACCES_TOKEN="123"
const REFRES_TOKEN="1234"
export const register=async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()) {
    const errorMesssages=errors.array().map((error)=>({
         field:error.path,
         message:error.msg  
    }))
    return res.status(400).json({errorMesssages})
}
try {
console.info(req.body)
let user=new UserSchema({
    ...req.body,
    passwordHash:bcrypt.hashSync(req.body.password  ,8)
})
user=await user.save()
if (!user) return res.status(500).json({type:'Internal server error',message:'could not create user'})
return res.status(201).json({user})
    } catch (error) {
        if(error.message.includes('email_1 dup key')){
            return res.status(409).json({
                type:'Autheror',
                message:"iser alreadu exots with this email"
            })
        }
    res.status(500).json({type:error.name,message:error.message})
}

}

export const login = async(req, res) => {

try {
    const {email,password}=req.body
    const user=await UserSchema.findOne({email:email})

    if(!user){
return res.status(404).json({message:"User not found"})


    }
    if(!bcrypt.compareSync(password,user.passwordHash))
        return res.status(400).json({message:"Password mismatch"})

   const accessToken=jwt.sign(
   {
    id:user.id,isAdmin:user.isAdmin
   }, ACCES_TOKEN,
   {expiresIn:'24h'},


   );
   const refreshToken=jwt.sign(
   {
    id:user.id,isAdmin:user.isAdmin
   }, REFRES_TOKEN,
   {expiresIn:'60d'},


   );
   const token=await tokenSchema.findOne({userId:user.id});

   if(token) await token.deleteOne();
   await new tokenSchema({
    userId:user.id,
    accessToken,
    refreshToken,
   }).save();

   user.passwordHash=undefined;
   return res.json({
    ...user,accessToken
   })
} catch (error) {
    res.status(500).json({type:error.name,message:error.message})

}
}

export const verifyToken = async(req,res)=>{
    try {
        const accessToken = req.headers.authorization
        if(!accessToken) return false
        accessToken = accessToken.replace('Bearer','').trim() 
        const token =await tokenSchema.findOne({accessToken})
        const tokenData=jwt.decode(token.refreshToken)

        const user=await UserSchema.findOne(tokenData.id)
        if(!user) return false
        const isValid=jwt.verify(token.refreshToken,1234)
        if(!isValid) return false
        return res.json(true)
    } catch (error) {
        
    }
}

export const forgotPassword=async(req,res)=>{
    try {
        
        const {email}=req.body
        const user=await UserSchema.findOne({email})
        
        if(!user){
            return res.json({message:"user not ffound"})
        }
        
        const otp=Math.floor(1000 + Math.random()*9000);
        user.resetPasswordOtp=otp;
        user.resetPasswordOtpExpiration=Date.now() + 600000
        
        await user.save()
        
        const response=await sendMail(
            email,
            'Password reset otp',
            `your otp for password resetis ${otp}`
            )
        console.log("helo")

    return res.status(200).json({message:response})
        
        
    } catch (error) {
        return res.json({type:error.name,message:error.message})
    }

}

export const verifyPasswordResetOtp = async(req, res) => {
     
try {
    // const user= await UserSchema.fin
    const {email,otp}=req.body;
    const user =await UserSchema.findOne({email})
    if(!user){
        res.status(404).json({message:"User not found"})

    }
    if(user.resetPasswordOtp!== +otp || Date.now()>user.resetPasswordOtpExpiration){
        return res.status(401).json({message:"invalid or expired password"})
    }

    user.resetPasswordOtp=1
    user.resetPasswordOtpExpiration=undefined
    await user.save()
    return res.json({message:"otp confirmed successfully"})
} catch (error) {
    
}

}

export const resetPassword=async(req, res)=>{
    try {
        
        
        const {email, newPassword} = req.body
    
    const user=await UserSchema.findOne({email})

if(!user) return res.status(404).json({message:"User not found"})
if(user.resetPasswordOtp!==1) {
    return res.status(401).json({message:"confirmed otp before resetting  password"})
  }

user.passwordHash=bcrypt.hashSync(newPassword,8)
user.resetPasswordOtp=undefined
await user.save()
return res.status(200).json({message:'password reset'})
} catch (error) {
    res.status(500).json({message:error.message})
}
}