import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItems.type";

interface CartContextType {
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productID: string) => void;
    // removeItemFromCart: (itemId: string) => void;
    // clearCart: () => void;
    // error: string;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    // removeItemFromCart: (itemId: string) => {},
    // clearCart: () => {},
    // error: "",
});

export const useCart = () => useContext(CartContext);
