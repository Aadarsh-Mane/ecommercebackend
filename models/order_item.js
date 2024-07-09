import mongoose, { Schema } from "mongoose";

const orderItemSchema = mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selectedSize: String,
  selectedColor: String,
});
orderItemSchema.set("toObject", { virtuals: true });
orderItemSchema.set("toJSON", { virtuals: true });
export default mongoose.model("OrderItem", orderItemSchema);
