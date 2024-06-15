import jwt from 'jsonwebtoken'

import tokenSchema from "../models/token.js"

export const erroHandler =async(error,req,res,next)=>{
    console.log(error)
 if(error.name==='UnauthorizedError'){
    console.log("fuck of")
    if(!error.message.includes('jwt expired')){
   return res.status(error.status).json({type:error.name,message:error.message})
    }
    try {
        const tokenHeader=req.header('Authorization')
        const accessToken=tokenHeader?.split(' ')[1]
        console.log("Extracted Access Token:", accessToken);

        let token=await tokenSchema.findOne({accessToken,refreshToken:{$exists:true}})
          if(!token){
       res.status(401).json({type:'Unauthorized',message:'token does not exist'})
}
const userData=jwt.verify(
    token.refreshToken,
    '1234',
    
)
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
        console.log("hellofrom")
        res.status(401).json({type:'Unauthorized',message:refreshTokenError.message})
    }
 }
}