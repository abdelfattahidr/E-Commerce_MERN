import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";

const RegistrePage = () => {
  const [error, setError] = useState("");
  const FNameRef = useRef<HTMLInputElement>(null);
  const LNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const firstName = FNameRef.current?.value;
    const lastName = LNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

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
      // setError("Unable to register user");
      // setError(response.data);
      return;
    }

    const data = await response.json();
    console.log(data);
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
        <Typography variant="h4">Register new Account</Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "450px",
            border: 1,
            borderBlockColor: "#f5F",
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
            type="password"
            id="password"
            label="Password"
            variant="outlined"
          />
          <TextField
            inputRef={passwordConfirmRef}
            type="password"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          {error && <Typography variant="h6" sx={{color:"red",textAlign:"center"}}>{error}</Typography>}
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
          <a href=""></a>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrePage;
