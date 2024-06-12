import mongoose from "mongoose";
const tokenSchema=mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,ref:'User',

}
,
refreshToken:{
    type:String,required:true
},
accessToken:String,
createdAt:{
    type:Date,default:Date.now,expires:60*86400
}
})

export default mongoose.model("Token",tokenSchema);