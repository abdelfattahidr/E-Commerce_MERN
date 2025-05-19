import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useAth } from "../context/Auth/AuthContext";
import { useCart } from "../context/cart/CartContext";

const Cart = () => {
  const { token } = useAth();
  const { cartItems, totalAmount } = useCart();
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
        
      } catch (error) {
        setError("Error fetching cart:" + error);
      }
    };
    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.productId} style={{ marginBottom: "20px" }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">Price: ${item.unitprice}</Typography>
            </div>
          ))}
          <Typography variant="h5">Total: ${totalAmount}</Typography>
        </div>
      )}
      <button>Checkout</button>
    </Container>
  );
};

export default Cart;
