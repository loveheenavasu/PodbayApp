"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, FormLabel } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginSection() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    // <ThemeProvider theme={defaultTheme} >
    <>
      <Container
        component="main"
        sx={{ background: "#09070d", width: "490px",mt:7 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom:2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: "#fff",
                fontFamily: " DM Serif Display, serif",
                textAlign: "left",
              }}
            >
              WELCOME BACK
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: "rgb(155, 125, 217)",
                fontFamily: " DM Serif Display, serif",
                textAlign: "left",
                letterSpacing: "5px",
                fontWeight: 900,
                fontSize: "30px",
              }}
            >
              LOG IN TO PODBAY
            </Typography>
          </Box>
          {/* <hr  style={{background:'rgb(72, 73, 81)', width:'100%', color:'rgb(72, 73, 81)'}}/> */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <label>EMAIL</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              //   label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              placeholder="Email Address"
              sx={{
                // padding: 10px 15px;
                // display: block;
                // width: 100%;
                // text-align: inherit;
                marginTop: 0,
                border: "1px solid rgb(72, 73, 81)",
                background: " transparent",
                color: "rgb(137, 137, 144)",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                input: {
                  color: "rgb(72, 73, 81)",
                  "&::placeholder": {
                    opacity: 1,
                    color: "rgb(72, 73, 81)",
                  },
                },
              }}
            />
            <label>PASSWORD</label>

            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              name="password"
              //   label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              sx={{
                // padding: 10px 15px;
                // display: block;
                // width: 100%;
                // text-align: inherit;
                marginTop: 0,
                border: "1px solid rgb(72, 73, 81)",
                background: " transparent",
                color: "rgb(137, 137, 144)",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                input: {
                  color: "rgb(72, 73, 81)",
                  "&::placeholder": {
                    opacity: 1,
                    color: "rgb(72, 73, 81)",
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                background: "#325a7e",
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              Log in
            </Button>
            <Typography sx={{ textAlign: "center" }}>or</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                // mb: 2,
                background: "black",
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              <AppleIcon sx={{ mr: 1 }} /> continue with Apple
            </Button>
            <Divider sx={{ color: "#fff" }} />
            <Grid
              container
              sx={{ textAlign: "center", justifyContent: "center", mt:2 }}
            >
              <Grid item>
                <Typography sx={{ color: "rgb(72, 73, 81)", fontSize: "15px" }}>
                  Don't have an account yet?
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ color: "rgb(72, 73, 81)" }}
                  >
                    {" Sign up for a free account."}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* <Divider /> */}
    </>

    // </ThemeProvider>
  );
}
