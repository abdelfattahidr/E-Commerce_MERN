import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAth } from "../../context/Auth/AuthContext";
import { Checkbox, FormControlLabel } from "@mui/material";

const RegistrePage = () => {
  const [error, setError] = useState("");
  const FNameRef = useRef<HTMLInputElement>(null);
  const LNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<boolean>(false);

  const { login } = useAth();

  const onSubmit = async () => {
    const firstName = FNameRef.current?.value;
    const lastName = LNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    if (!firstName || !lastName || !email || !passwordConfirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== passwordConfirm) {
      setError("confirm your password");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/register`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      setError("Unable to register user");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect Token");
      return;
    }

    login(email, token);
    setError("");
    window.location.href = "/";
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h4">Register new Account</Typography>
        {error && (
          <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "450px",
            padding: 4,
          }}
        >
          <TextField
            inputRef={FNameRef}
            id="firstname"
            label="First Name"
            variant="outlined"
          />
          <TextField
            inputRef={LNameRef}
            id="lastname"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            inputRef={emailRef}
            id="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            inputRef={passwordRef}
            type={password ? "text" : "password"}
            id="password"
            label="Password"
            variant="outlined"
          />
          <TextField
            inputRef={passwordConfirmRef}
            type={password ? "text" : "password"}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox id="ShowPassword" />}
            label="Show Password"
            onChange={(e) => {
              if (e.target.checked) {
                setPassword(true);
              } else {
                setPassword(false);
              }
            }}
          />
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
          <Typography variant="h6">
            <p>
              Already have an account ? <a href="/auth/login"> Login here</a>
            </p>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrePage;
