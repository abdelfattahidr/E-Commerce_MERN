import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useCart } from "../context/cart/CartContext";
const Cart = () => {
  const { cartItems, totalamount } = useCart();
  const [error, setError] = useState("");

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">
        My Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty
        </Typography>
      ) : (
        <div>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              style={{ marginBottom: "20px" }}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img src={item.image} width={150} />
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">
                {item.unitprice} $ X {item.quantity}
              </Typography>
            </Box>
          ))}
          <Typography variant="h5">Total: {totalamount}$</Typography>
        </div>
      )}
      <button>Checkout</button>
    </Container>
  );
};

export default Cart;
