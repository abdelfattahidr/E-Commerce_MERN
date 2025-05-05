import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAth } from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login } = useAth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    } else {
      setError("");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      setError("Unable to login user");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect Token");
      return;
    }

    login(email, token);
    navigate("/");
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Login</Typography>
        {error && (
          <Typography
            variant="h6"
            sx={{ color: "red", textAlign: "center", justifyContent: "center" }}
          >
            {error}
          </Typography>
        )}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "450px",
            padding: 4,
          }}
        >
          <TextField
            inputRef={emailRef}
            id="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            id="password"
            label="Password"
            variant="outlined"
          />
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
          <Typography variant="h6">
            <p>
              Don't have an account? <a href="/auth/register"> Register here</a>
            </p>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
