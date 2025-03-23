import { cartModel } from "../models/cart.model";
import { productModel } from "../models/product.model";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "Active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
interface AddProductToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addProductToCart = async ({
  userId,
  productId,
  quantity,
}: AddProductToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(p => p.product.toString() === productId);
  if (existInCart) {
    return { data: "Product already exists in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
