import { useEffect } from "react";
import { useAth } from "../context/Auth/AuthContext";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Orders = () => {
  const { myorders, getmyorders } = useAth();
  useEffect(() => {
    getmyorders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(myorders);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">
        My Cart
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }} gap={3}>
        <Box>
          <TableContainer component={"div"} sx={{ maxHeight: 400 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    address
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    orderItems
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    total
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    more detailes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myorders.length === 0 ? (
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={5}
                    sx={{ fontWeight: "bold" }}
                  >
                    Your cart is empty , start shopping and add products to cart
                  </TableCell>
                ) : (
                  myorders.map(({ _id, address, total, orderItems }) => (
                    <TableRow key={_id}>
                      <TableCell align="center">{address}</TableCell>
                      <TableCell align="center">{orderItems.length}</TableCell>
                      <TableCell align="center">{total} $</TableCell>
                      <TableCell align="center">
                        <a
                          href={`/order/${_id}`}
                          style={{ textDecoration: "none", color: "blue" }}
                        >
                          View Details
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Orders;
