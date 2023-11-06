"use client"
import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Grid container>
        <Grid item xs={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="text">
              <KeyboardArrowLeftIcon fontSize="large" sx={{ color: "gray" }} />
            </Button>
            <Button variant="text">
              <KeyboardArrowRightIcon fontSize="large" sx={{ color: "gray" }} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Search through over 30 millions podcasts and ebisodes"
              style={{
                border: "1px solid hsl(242,3%,55%)",
                width: "92%",
                borderRadius: "15px",
                padding: "10px 20px",
                color: "#fff",
              }}
              className="custom-input"
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#355c80",
              fontSize: "14px",
              textTransform: "capitalize",
              mr: 1,
            }}
            onClick={handleLoginClick}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#355c80",
              fontSize: "14px",
              textTransform: "capitalize",
              ml: 1,
            }}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
