import mongoose, { Schema } from "mongoose";
import product from "./product";

const reviewSchema = mongoose.create({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reserved: {
    type: Boolean,
    default: true,
  },
});

reviewSchema.set("toObject", {
  virtuals: true,
});
reviewSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Review", reviewSchema);
