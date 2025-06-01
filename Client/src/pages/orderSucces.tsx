import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSucces = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        animation: "moveUp 5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
      <Typography variant="h4"> Thanks for you order.</Typography>
      <Typography>
        We started processing it, and we will get back to you soon
      </Typography>
      <Button variant="contained" onClick={handleHome}>
        Go to Home
      </Button>
    </Container>
  );
};

export default OrderSucces;
