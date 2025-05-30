/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/cartItems.type";
import { useAth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalamount, settotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setError("Failed to fetch cart");
        }
        const cart = await response.json();

        const cartItemsMapp = cart.items.map(
          ({
            product,
            quantity,
            unitprice,
          }: {
            product: any;
            quantity: number;
            unitprice: number;
          }) => ({
            productId: product._id,
            title: product.title,
            image: product.image,
            stock: product.stock,
            quantity,
            unitprice,
          })
        );

        setCartItems(cartItemsMapp);
        settotalAmount(cart.totalamount);
      } catch (error) {
        setError("Error fetching cart:" + error);
      }
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productID: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: productID, quantity: 1 }),
      });

      if (!response.ok) {
        setError("Failed to add item to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to fetch cart data");
        return;
      }
      const cartItemsMapp = cart.items.map(
        ({
          product,
          quantity,
          unitprice,
        }: {
          product: any;
          quantity: number;
          unitprice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          stock: product.stock,
          quantity,
          unitprice,
        })
      );

      setCartItems([...cartItemsMapp]);
      settotalAmount(cart.totalamount);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding item to cart");
      setCartItems([]);
    }
  };

  const updatecart = async (productID: string, quantity: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: productID, quantity }),
      });

      if (!response.ok) {
        setError("Failed to update cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to fetch cart data");
        return;
      }
      const cartItemsMapp = cart.items.map(
        ({
          product,
          quantity,
          unitprice,
        }: {
          product: any;
          quantity: number;
          unitprice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          stock: product.stock,
          quantity,
          unitprice,
        })
      );

      setCartItems([...cartItemsMapp]);
      settotalAmount(cart.totalamount);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding item to cart");
      setCartItems([]);
    }
  };

  const removeItemFromCart = async (productID: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${productID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Failed to Delete product frm cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to fetch cart data");
        return;
      }
      const cartItemsMapp = cart.items.map(
        ({
          product,
          quantity,
          unitprice,
        }: {
          product: any;
          quantity: number;
          unitprice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          stock: product.stock,
          quantity,
          unitprice,
        })
      );

      setCartItems([...cartItemsMapp]);
      settotalAmount(cart.totalamount);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error for delete cart");
      setCartItems([]);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to empty cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to fetch cart data");
        return;
      }
      setCartItems([]);
      settotalAmount(0);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error for delete cart");
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalamount,
        addItemToCart,
        updatecart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
