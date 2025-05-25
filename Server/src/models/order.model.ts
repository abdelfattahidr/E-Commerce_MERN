import mongoose, { Schema, ObjectId, Document } from "mongoose";

export interface IOrderItems {
  productTitle: string;
  productImage: string;
  unitprice: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderItems: IOrder[];
  total: number;
  address: string;
  userId: Object | string;
}

const OrderItemSchema = new Schema<IOrderItems>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  unitprice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  orderItems: [OrderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const ordertModel = mongoose.model<IOrder>("Order", OrderSchema);
