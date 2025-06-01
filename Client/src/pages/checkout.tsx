import { useRef } from "react";
import Table from "@mui/material/Table";
import { Box, Button, TextField, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCart } from "../context/cart/CartContext";
import { useAth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { token } = useAth();
  const navigate = useNavigate();
  const { cartItems, totalamount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const handleCheckout = async () => {
    const address = addressRef.current?.value;
    const phone = phoneRef.current?.value;
    const date = dateRef.current?.value;
    const card = cardRef.current?.value;
    const cvv = cvvRef.current?.value;

    if (!address || !phone || !date || !card || !cvv) {
      alert("Please fill in all fields");
      return;
    }
    if (isNaN(Number(phone)) || isNaN(Number(card)) || isNaN(Number(cvv))) {
      alert("Phone, Card Number, and CVV must be numeric values");
      return;
    }
    //todo_ add another information for payment
    // const paymentDetails = {
    //   address,
    //   phone,
    //   date,
    //   card,
    //   cvv,
    // };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/cart/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      }
    );

    if (!response.ok) return;

    navigate("/success");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">
        Checkout
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }} gap={3}>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Title
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Total Amount For O.P
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell align="center">
                      <img
                        src={item.image}
                        width={100}
                        alt={item.title}
                        style={{ borderRadius: "10px" }}
                      />
                    </TableCell>
                    <TableCell align="center">{item.title}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {item.quantity * item.unitprice} $
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
              <Typography variant="h6" sx={{ m: 4, fontWeight: "bold" }}>
                Total Amount: {totalamount} $
              </Typography>
            </Box>
          </TableContainer>
        </Box>
        <Box
          sx={{
            width: "400px",
            p: 3,
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            information for pyment
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="address"
              variant="outlined"
              inputRef={addressRef}
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              inputRef={phoneRef}
            />
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              inputRef={cardRef}
            />
            <TextField
              fullWidth
              label="Expiration Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputRef={dateRef}
            />
            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              inputRef={cvvRef}
            />
            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              onClick={handleCheckout}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
