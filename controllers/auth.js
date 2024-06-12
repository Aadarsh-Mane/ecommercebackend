import { validationResult } from "express-validator"
import UserSchema from "../models/user.js"
import tokenSchema from "../models/token.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import token from "../models/token.js"

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