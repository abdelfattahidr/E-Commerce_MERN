import Table from "@mui/material/Table";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCart } from "../context/cart/CartContext";

const Cart = () => {
  const { cartItems, totalamount, updatecart, removeItemFromCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return (quantity = 1); // Ensure quantity is at least 1
    }
    updatecart(productId, quantity);
  };

  const handlRemove = (productId: string) => {
    removeItemFromCart(productId);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">
        My Cart
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }} gap={3}>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Title
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    unitprice
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.length === 0 ? (
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={5}
                    sx={{ fontWeight: "bold" }}
                  >
                    Your cart is empty
                  </TableCell>
                ) : (
                  cartItems.map((item) => (
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
                      <TableCell align="center">{}</TableCell>
                      <TableCell align="center">{item.unitprice} $</TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="Basic button group"
                        >
                          <Button
                            onClick={() =>
                              handleQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <Button
                            disabled
                            sx={{
                              pointerEvents: "none",
                              backgroundColor: "#fff",
                            }}
                          >
                            {item.quantity}
                          </Button>
                          <Button
                            onClick={() =>
                              handleQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <Button
                            onClick={() => handlRemove(item.productId)}
                            sx={{
                              backgroundColor: "#f44336",
                              color: "#fff",
                              border: "none",
                            }}
                          >
                            X
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total Amount: {totalamount} $
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => console.log("Proceed to Checkout")}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
