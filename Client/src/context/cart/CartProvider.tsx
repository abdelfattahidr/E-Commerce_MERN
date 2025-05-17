import { FC, PropsWithChildren,useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/cartItems.type";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // const [error, setError] = useState("");

  const addItemToCart = (productID: string) => {
    console.log("Adding product to cart:", productID);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;