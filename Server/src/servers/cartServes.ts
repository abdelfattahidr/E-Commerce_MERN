import { cartModel, ICartItem } from "../models/cart.model";
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

interface ClearCart {
  userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
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

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
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

interface updateProductToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateProductToCart = async ({
  userId,
  productId,
  quantity,
}: updateProductToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Product dose not exists in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateTotalAmount({ cartItems: otherCartItems });

  existInCart.quantity = quantity;
  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface DeleteProductFromCart {
  userId: string;
  productId: any;
}

export const deleteProductFromCart = async ({
  userId,
  productId,
}: DeleteProductFromCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Product dose not exists in cart", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateTotalAmount({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

const calculateTotalAmount = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((acc, pro) => {
    return (acc += pro.quantity * pro.unitPrice);
  }, 0);

  return total;
};
