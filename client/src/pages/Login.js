import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currntTarget);
    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const res = await fetch("http://localhost:9090/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    const { token } = await res.json();

    if (res.ok) {
      console.log(token);
      console.log("user logged");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link component="span" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
