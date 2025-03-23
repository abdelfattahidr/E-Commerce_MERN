import mongoose, { Schema, ObjectId, Document } from "mongoose";
import { IProduct } from "./product.model";

const CartStatusEnum = ["Active", "Comleted"];
export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "Active" | "Comleted";
}

const cartItemsSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemsSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: CartStatusEnum, default: "Active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
