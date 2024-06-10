import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    name:{
    type: String,
    required: true,
    trim:true,  
    


    },
    email:{
        type:String,
        required: true,
        validate:{
            validator:(value)=>{
                const reg='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
                 return value.match(reg);
            },
            mes:"please enter a valid email"
        }
    },
    passwordHash:{
        type:String,
        required: true,

    },
    street:{
        type:String,
    },
    apartment:{
        type:String,
    },
    city:{
        type:String,
    },
    postalCode:{
        type:String,
    },
    country:{
        type:String,
    },
    phone:{
        type:String,
        required: true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false

    },

    resetPasswordOtp:Number,
    resetPasswordOtpExpiration:{
        type:Date
    },
    wishlist:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',
            required:true,

            },
            productName:{
                type:String,required:true,
            },
            productImage:{
                type:String,required:true,
            },
            productPrice:{
                type:String,required:true,
            }
        },
    ]
,

    
})
userSchema.index({ email: 1, phone: 1 }, { unique: true });

export default mongoose.model("User",userSchema);