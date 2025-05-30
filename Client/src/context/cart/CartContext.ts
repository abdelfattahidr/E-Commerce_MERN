import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItems.type";

interface CartContextType {
  cartItems: CartItem[];
  totalamount: number;
  addItemToCart: (productID: string) => void;
  updatecart: (productID: string, quantity: number) => void;
  removeItemFromCart: (productID: string) => void;
  clearCart: () => void;
  // error: string;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalamount: 0,
  addItemToCart: () => {},
  updatecart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  // error: "",
});

export const useCart = () => useContext(CartContext);
