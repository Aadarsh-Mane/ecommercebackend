import UserSchema from "../models/user.js"



export const  getUsers=async(_,res)=>{
try {
     const users=await UserSchema.find().select('name email id isAdmin')

     if(!users){
        return res.json(users)
     }
} catch (error) {
    return res.status(404).json({message:"User not found"})

}
}
export const  getUserById=async(req,res)=>{
  try {
    const user=await UserSchema.findById(req.params.id).select('-passwordHash -resetPasswordOtp -resetPasswordOtpExpires')
    if(!user) return res.status(404).json({message:"User not found"})
        return res.json({user})
  } catch (error) {
    
  }
}
export const  updateUser=async(req,res)=>{
       try {
          const {name,email,phone} =req.body
          const user=await UserSchema.findByIdAndUpdate(req.params.id
            , {name,email,phone},
            {new: true}
          )
          if(!user) return res.status(404).json({message:"User not found"})
            user.passwordHash=undefined
            return res.json({user})
       } catch (error) {
        
       }
}