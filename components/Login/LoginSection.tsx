"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import login from "@/services/authentication";
import { useDispatch } from "react-redux";
import { setSelectedId } from "@/redux/Slice";
import theme from "@/theme/Theme";
import { FormData } from "@/types/Types";
import { toast, ToastOptions } from "react-toastify";


export default function LoginSection() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await login(formData.email, formData.password);

    if (response.success) {
      const token = JSON.stringify(response?.data?.token);
      Cookies.set("authToken", token);
      const userData = JSON.stringify(response?.data?.user);
      Cookies.set("user", userData);
      const redirectTo: any  = router.query.redirect || "/";
      dispatch(setSelectedId(null));
      router.push(redirectTo);
      toast.success(`You Login  Sucessfully`, {
        duration: 60000,
        position: "top-right",
      } as ToastOptions);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <Container
        component="main"
        sx={{ background: "#09070d", width: "490px", mt: 7 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
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
                color: theme.colors.TextPrimary,
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

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <label>EMAIL</label>
            <TextField
              value={formData?.email}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              placeholder="Email Address"
              sx={{
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
              value={formData?.password}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              sx={{
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
                background: theme.colors.Black,
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              <AppleIcon sx={{ mr: 1 }} /> continue with Apple
            </Button>
            <Divider sx={{ color: theme.colors.TextPrimary }} />
            <Grid
              container
              sx={{ textAlign: "center", justifyContent: "center", mt: 2 }}
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
    </>
  );
}
