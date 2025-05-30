import { cartModel, ICartItem } from "../models/cart.model";
import { IOrderItems, ordertModel } from "../models/order.model";
import { productModel } from "../models/product.model";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalamount: 0 });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}
export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: getActiveCartForUser) => {
  let cart;

  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "Active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "Active" });
  }

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
  cart.totalamount = 0;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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
    unitprice: product.price,
    quantity,
  });

  cart.totalamount += product.price * quantity;

  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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

  let total = calculateTotalamount({ cartItems: otherCartItems });

  existInCart.quantity = quantity;
  total += existInCart.quantity * existInCart.unitprice;
  cart.totalamount = total;

  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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

  let total = calculateTotalamount({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalamount = total;

  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const calculateTotalamount = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((acc, pro) => {
    return (acc += pro.quantity * pro.unitprice);
  }, 0);

  return total;
};

interface checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: checkout) => {
  if (!address) {
    return { data: "please add the address", statusCode: 400 };
  }
  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItems[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }

    const orderItem: IOrderItems = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitprice: item.unitprice,
    };

    orderItems.push(orderItem);
  }

  const order = await ordertModel.create({
    orderItems,
    total: cart.totalamount,
    address,
    userId,
  });

  await order.save();
  cart.status = "Comleted";
  await cart.save();

  return { data: order, statusCode: 200 };
};
