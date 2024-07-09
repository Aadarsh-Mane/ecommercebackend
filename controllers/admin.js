import UserSchema from "../models/user.js";
import orderSchema from "../models/order.js";
import orderItemSchema from "../models/order_item.js";
import cartProductSchema from "../models/cart_product.js";

export const getUserCount = async () => {
  try {
    const userCount = await UserActivation.countDocuments();
    if (!userCount) {
      return resizeBy.status(500).json({
        message: "could not count user",
      });
    }
    return res.json({ userCount });
  } catch (error) {}
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserSchema.findById(userId);
    if (!user) {
      return;
    }
    const orders = await orderSchema.find({ user: userId });
    const orderItemsIds = orders.flatMap((order) => order.orderItems);
    await orderSchema.deleteMany({ user: userId });
    await orderItemSchema.deleteMany({ _id: { $in: orderItemsIds } });
    await cartProductSchema.deleteMany({ _id: { $in: user.cart } });
  } catch (error) {}
};
