"use client";
import CardSection from "@/components/CardSection/CardSection";
import Layout from "@/layout/Layout";
import { setUserData } from "@/redux/Slice";
import theme from "@/theme/Theme";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        dispatch(setUserData(parsedData));
      } catch (error) {
        console.error("Error parsing 'user' cookie:", error);
      }
    } else {
      console.error("The 'user' cookie is not set or is empty.");
    }
  }, []);

  return (
    <>
      <Layout>
        <ToastContainer autoClose={4000} />

        <Box
          sx={{
            display: "flex",
            width: "80vw",
            color: "#fff",
            mt: 4,
            flexDirection: "column",
            background: theme.colors.BgPrimary,
          }}
        >
          <CardSection />
        </Box>
      </Layout>
    </>
  );
};

export default Dashboard;
