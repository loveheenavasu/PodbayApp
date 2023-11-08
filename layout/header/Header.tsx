"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastOptions } from "react-toastify";
import {
  setCurrentDuration,
  setCurrentPlaybackTime,
  setSelectedId,
  setUserData,
} from "@/redux/Slice";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import theme from "@/theme/Theme";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
import { UserData } from "@/types/Types";

const Header = () => {
  const handleLoginClick = () => {
    router.push("/login");
  };

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const userData = useSelector(
    (state: RootState) => state?.data?.userData
  ) as unknown as UserData;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (Cookies.get("authToken") && Cookies.get("user")) {
      Cookies.remove("authToken");
      Cookies.remove("user");
      dispatch(setCurrentPlaybackTime(0));
      dispatch(setCurrentDuration(0));
      dispatch(setSelectedId(null));
      dispatch(setUserData(null));
      toast.success(`You Logged out Sucessfully`, {
        duration: 60000,
        position: "top-right",
      } as ToastOptions);
    } else {
      toast.warning(`You are not logged in`, {
        duration: 60000,
        position: "top-right",
      } as ToastOptions);
    }
    router.replace("/");
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
            <Button variant="text" onClick={handleGoBack}>
              <KeyboardArrowLeftIcon
                fontSize="large"
                sx={{ color: theme.colors.TextGray }}
              />
            </Button>
            <Button variant="text">
              <KeyboardArrowRightIcon
                fontSize="large"
                sx={{ color: theme.colors.TextGray }}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: userData ? "end" : "center",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Search through over 30 millions podcasts and ebisodes"
              style={{
                border: "1px solid hsl(242,3%,55%)",
                width: userData ? "94%" : "92%",
                borderRadius: "15px",
                padding: "10px 20px",
                color: "#fff",
              }}
              className="custom-input"
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          {userData ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    {userData?.username}{" "}
                    <KeyboardArrowDownIcon sx={{ ml: 1 }} />
                  </Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout <ExitToAppIcon sx={{ ml: 1 }} />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          ) : (
            <>
              {" "}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.colors.BackgroundBtn,
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
                  backgroundColor: theme.colors.BackgroundBtn,
                  fontSize: "14px",
                  textTransform: "capitalize",
                  ml: 1,
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
