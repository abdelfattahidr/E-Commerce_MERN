import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useAth } from "../context/Auth/AuthContext";

const Cart = () => {
  const { token } = useAth();
  const [cart, setCart] = useState();
  useEffect(() => {
    if(!token){
      return
    }
    fetch(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();
        setCart(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [token]);
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">My Cart</Typography>
      <p>Your cart is empty.</p>
      <button>Checkout</button>
    </Container>
  );
};

export default Cart;
