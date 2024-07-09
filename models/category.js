import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: { type: String, default: "#000000" },
  image: { type: String, required: true },
  markedForDeletion: { type: Boolean, default: false },
});
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
export default mongoose.model("Category", categorySchema);
