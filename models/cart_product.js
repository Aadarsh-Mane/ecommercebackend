import mongoose, { Schema } from "mongoose";
import product from "./product";

const cartProductSchema = mongoose.create({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selectedSize: String,
  selectedColor: String,
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  reservationExpiry: {
    type: String,
    default: () => new Date(Date.now() + 30 * 60 * 1000),
  },
  reserved: {
    type: Boolean,
    default: true,
  },
});

cartProductSchema.set("toObject", {
  virtuals: true,
});
cartProductSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Order", cartProductSchema);
