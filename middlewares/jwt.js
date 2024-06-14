import { expressjwt } from "express-jwt";
import tokenSchema from "../models/token.js"


export const authjwt=()=>{
    const API=process.env.API_URL
return expressjwt({
   secret: 123,
   algorithms:['HS256'],
   isRevoked:isRevoked
}).unless({
    path:[
        `${API}/login`
        `${API}/login/`
        `${API}/register`,
        `${API}/register/`,
        `${API}/reset-password`,     // Path for resetting the password
        `${API}/reset-password/`,     // Path for resetting the password
        `${API}/verify-otp`,         
        `${API}/verify-otp/`,         // Path for OTP verification
        `${API}/forgot-password`,    // Path for the forgot password process
        `${API}/forgot-password/`,    // Path for the forgot password process

    ]
})


}
const isRevoked =async(req,jwt)=>{
const authHeader=req.header('Authorization')

if(!authHeader.startsWith('Bearer')){
    return true;
}
const accessToken=authHeader.replace('Bearer','').trim()
 
const token=await tokenSchema.findOne({accessToken})
const adminRouteRegex= '/^\/api/v1\/admin\//i';
const adminFault=!jwt.payload.isAdmin && adminRouteRegex.test(req.originalUrl)
console.log(token)
return adminFault || !token
}

