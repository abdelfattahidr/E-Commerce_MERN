/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useAth } from "../context/Auth/AuthContext";

const Cart = () => {
  const { token } = useAth();
  const [cart, setCart] = useState();
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
        const data = await response.json();
        setCart(data);
      } catch (error) {
        setError("Error fetching cart:" + error);
      }
    };
    fetchCart();
  }, [token]);
  console.log(cart);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">My Cart</Typography>
      <p>Your cart is empty.</p>
      <button>Checkout</button>
    </Container>
  );
};

export default Cart;
