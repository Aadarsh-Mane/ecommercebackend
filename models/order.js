import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: SchemaType.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: String,
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentId: String,
  status: {
    type: String,
    default: "pending",
    enum: [
      "pending",
      "processed",
      "shipped",
      "out-for-delivery",
      "delivered",
      "cancelled",
      "on-hold",
      "expired",
    ],
  },
  statusHistory: {
    // type:[{
    //     'pending':{
    //         startDate:{
    //             type:Date
    //         },

    //     }
    // }],
    type: [String],
    enum: [
      "pending",
      "processed",
      "shipped",
      "out-for-delivery",
      "delivered",
      "cancelled",
      "on-hold",
      "expired",
    ],
    required: true,
    default: ["pending"],
  },
  totalPrice: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });
export default mongoose.model("Order", orderSchema);
