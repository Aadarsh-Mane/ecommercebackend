import mongoose, { Schema } from "mongoose";


const productSchema=mongoose.create({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        available:{
          type:Boolean,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        rating: {
          type: Number,
          required: true,
          default:0.0
        },
        color: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        images: {
          type: [String], // Array of strings for multiple image URLs
          validate: [arrayLimit, '{PATH} exceeds the limit of 10'] // Optional: limit the number of images
        },
        reviews: {
          type: Schema.Types.ObjectId,
          ref:'Review',
          required: true,
     
        },
        numberOfReviews: {
          type: Number,
          required: true,
          min: 0,
        },
        sizes: {
            type: [String],
            required: true,
            enum: ['Small', 'Medium', 'Large'], // Example of enum for sizes
          },
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
          },
          genderAgeCategory: {
            type: String,
            required: true,
            enum: ['Men', 'Women', 'Unisex','kids'], // Example of enum for genderAgeCategory
          },
          countInStock: {
            type: Number,
            required: true,
            min: 0,
            max:25
          },
          dateAdded: {
            type: Date,
            default: Date.now,
          }
      })
    //pre save hook
    productSchema.pre('save',async(next)=>{
 if(this.reviews.length>0){
    await this.populate('reviews')
    const totalRating=this.reviews.reduce((acc,review)=>acc+review.rating,0
    
 )
 this.rating=totalRating/this.reviews.length
 this.rating=parseFloat((totalRating/this.reviews.length).toFixed(1))
 this.numberOfReviews=this.reviews.length 

}
 next()
    })

productSchema.index()
    
export default mongoose.model('Product', productSchema);