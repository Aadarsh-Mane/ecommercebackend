import jwt from 'jsonwebtoken'

import tokenSchema from "../models/token.js"

export const erroHandler =async(error,req,res,next)=>{
 if(error.name==='UnauthorizedError'){
    if(!error.message.includes('jwt expired')){
   return res.status(error.status).json({type:error.name,message:error.message})
    }
    try {
        const tokenHeader=req.header('Authorization')
        const authToken=tokenHeader?.split('')[1]
        let token=await tokenSchema.findOne({accesToken,refreshToken:{$exists:true}})
          if(!token){
       res.status(401).json({type:'Unauthorized',message:'token does not exist'})
}
const user=await UserSchema.findById(userData.id)
if(!user){
    return res.status(404).json({message: 'User not found ' })
}
const newAccessToken = jwt.sign({id:user.id,isAdmin:user.isAdmin},'123',
    {expiresIn:'24h'} 
)
req.headers['authorization'] = `Bearer ${newAccessToken}`
await tokenSchema.updateOne({_id:token.id},{access_token:newAccessToken}).exec()
 res.set('Authorization',`Bearer ${newAccessToken}`)
 return next()
    } catch (refreshTokenError) {
        res.status(401).json({type:'Unauthorized',message:refreshTokenError.message})
    }
 }
}