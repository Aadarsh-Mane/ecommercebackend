import express from 'express';
import { register } from '../controllers/auth.js';


const authRouter =express.Router();

authRouter.post('/login',(req,res)=>{
 
})
authRouter.post('/register',register)
authRouter.post('/forgot-password',(req,res)=>{
 
})
authRouter.post('/verify-otp',(req,res)=>{
    
})
authRouter.post('/reset-password',(req,res)=>{
 
})
export default authRouter
